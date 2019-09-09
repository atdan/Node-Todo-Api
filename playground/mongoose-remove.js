const {ObjectID} = require(`mongodb`);

const {mongoose} = require(`./../server/db/mongoose`);
const {Todo} = require(`./../server/models/todo`);
const {User} = require(`./../server/models/user`);


//to remove many
// Todo.remove({}).then((res) => {
//     console.log(res);
// });

//Todo.findOneAndDelete()

Todo.findOneAndDelete({_id: '5d7622c44374cf62876e274d'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5d7622c44374cf62876e274d').then((todo) => {
    console.log(todo)
} );