// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj)

// destructuring ***

// var user = {name: `david`, age: 21};
//
// var {name} = user;
//
// console.log(name);
// ****


MongoClient.connect(`mongodb://localhost:27017/TodoApp`, (err, client) =>{
   if (err){
       return  console.log('Unable to connect to mongoDB server')
   }

   console.log(`Connected to the MongoDB server`);

    const db = client.db(`TodoApp`);

    // db.collection(`Todos`).insertOne({
    //
    //     text: `Something todo`,
    //     completed: false
    //
    // }, (err, res) => {
    //    if (err){
    //        return console.log(`Unable to insert Todo`, err)
    //    }
    //    console.log(JSON.stringify(res.ops , undefined, 2));
    // });

    //insert new doc into the users collection
    //name, age, location

    db.collection(`Users`).insertOne({

        name: 'atuma',
        age: 25,
        location: `Abuja`
    }, (err, res) => {
        if (err){
            return console.log`Unable to insert User`
        }

        console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
    });


    client.close();
});