var mongoose = require(`mongoose`);

var userSchema = {
    email: {
        type: String,
        trim: true,//removess whitespace at beginning and end
        minlength: 1,
        required: true
    }
};

var User = mongoose.model(`User`, userSchema);

module.exports = {User};