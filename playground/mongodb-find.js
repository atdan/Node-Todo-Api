const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect(`mongodb://localhost:27017/TodoApp`, (err, client) =>{
    if (err){
        return  console.log('Unable to connect to mongoDB server')
    }

    console.log(`Connected to the MongoDB server`);

    const db = client.db(`TodoApp`);
    // db.collection("Todos").find().count().then( (count) => {
    //     console.log(`Todos count: ${count}`);
    //     // console.log((JSON.stringify(docs, undefined, 2)));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // });

    db.collection('Users').find({name: 'Dan'}).toArray().then( (docs) => {

        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    })


    // client.close();
});