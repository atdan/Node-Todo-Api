const mongoose = require(`mongoose`);
const validator = require(`validator`);
const jwt = require(`jsonwebtoken`);
const _ = require(`lodash`);


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


var User = mongoose.model(`User`, UserSchema);

module.exports = {User};