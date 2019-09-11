const {ObjectID} = require(`mongodb`);
const jwt = require(`jsonwebtoken`);


const {Todo} = require(`./../../models/todo`);
const {User} = require(`./../../models/user`);


const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [{
    _id: userOneID,
    email: 'atuma@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoID,
    email: 'dom@example.com',
    password: 'userTwoPass'
}];

const todos = [{

    _id: new ObjectID,
    text: 'First test todo'
},{
    _id: new ObjectID,
    text: 'Second test todo',
    completed: true,
    completedAt: 12345
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};
const populateUsers = (done) => {
    User.remove({}).then(() => {
       var user1 = new User(users[0]).save();

       var user2 = new User(users[2]).save();

       //takes an array of promises and doesn't get called back until all th promises are saved
        return Promise.all([user1, user2]);
    }).then(() => done());
};
module.exports = {todos, populateTodos, users, populateUsers};