// node module import
var express = require(`express`);
var bodyParser = require(`body-parser`);

//local import
var {mongoose} = require(`./db/mongoose`);
var {Todo} = require(`./models/todo`);
var {User} = require(`./models/user`);

var app = express();

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

app.listen(3000, () => {
    console.log(`Started on port 3000`)
});