const mongoose = require(`mongoose`);
const validator = require(`validator`);
const jwt = require(`jsonwebtoken`);
const _ = require(`lodash`);
const bcrypt = require(`bcryptjs`);


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,//removess whitespace at beginning and end
        minlength: 1,
        required: true,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access:{
            type: String,
            required: true

        },
        token:{
            type: String,
            required: true
        }
    }]
} ) ;


UserSchema.methods.generateAuthToken = function () {

    var user = this;

    var access = 'auth';

    var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

    //upadte the user model
    user.tokens = user.tokens.concat([{ access,token }]);

    return user.save().then(() => {
       // console.log('Token model: ', token);

        return token;
    })

};

//override the method to not return the token and user password
//this determines what is sent back when to the user
UserSchema.methods.toJSON = function (){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
};

// it's also an object like methods
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
      decoded = jwt.verify(token, 'abc123');
  }catch (e) {

      // return new Promise((resolve, reject) =>{
      //     reject();
      // })

      return Promise.reject();
  }

  return User.findOne({
     '_id': decoded._id,
     'tokens.token': token,
      'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password){

    var User = this;

    return User.findOne({email}).then((user) => {
        //if no user exists in the db with email go to catch block will be called
        if (!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            //use bcrypt .compare to compare the password

             bcrypt.compare(password, user.password, (err, res ) => {

                 if (res){
                     resolve(user);
                 }else {
                     reject();
                 }
             })
        })
    })
};

//use mongoose middleware to store hashed password
UserSchema.pre('save', function (next) {
   var user = this;

   //only encrypt the password once after it is modified
   if (user.isModified('password')){

       var password = user.password;

       bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(password, salt, (err, hash) => {
               user.password = hash;
               next();
           })
       })

   }else {
       next();
   }
});
var User = mongoose.model(`User`, UserSchema);

module.exports = {User};