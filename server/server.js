// node module import
var express = require(`express`);
var bodyParser = require(`body-parser`);
var {ObjectID} = require(`mongodb`);

//local import
var {mongoose} = require(`./db/mongoose`);
var {Todo} = require(`./models/todo`);
var {User} = require(`./models/user`);

var app = express();
const port = 3000;

//middleware
app.use(bodyParser.json());

app.post(`/todos`, (req, res) => {

    //console.log(req.body);

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err)
    });
});

//get all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (err) => {

        res.status(400).send(err);
    });
});

// GET /todos/1234
app.get(`/todos/:id`, (req, res) => {
    var id = req.params.id;


    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo){

            return res.status(404).send();

        }
        res.status(200).send({todo});

    }).catch((err) => {
        res.status(400).send()
    })

});

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;

    //validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }


    //remove toodo by id
    Todo.findByIdAndRemove(id).then( (todo) => {
        if (!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch( (err) => {
        res.status(400).send()
    })

        //sucess
            //if no doc sen d 400
            //if doc send doc find with 200
        //error
            //400 with empty body
});


app.listen(port, () => {
    console.log(`Started on port ${3000}`);
});

module.exports = {app};