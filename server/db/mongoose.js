var mongoose = require(`mongoose`);

//use built in promise lib
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/TodoApp`);

module.exports = {
    mongoose: mongoose
}