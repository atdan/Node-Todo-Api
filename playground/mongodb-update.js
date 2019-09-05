const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect(`mongodb://localhost:27017/TodoApp`, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server')
    }
    console.log(`Connected to MongoDB server`)
    const db = client.db(`TodoApp`);

    // db.collection(`Todos`).findOneAndUpdate({
    //     _id: new ObjectID('5d712e69cc29cffe5aaf229b')
    //  }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then( (res) => {
    //     console.log(res);
    // });

    db.collection(`Users`).findOneAndUpdate({
        name: 'Daniel'
    }, {
        $set:{
            name: 'update Daniel'
        },
        $inc:{
            age: 1
        }

    }, {
        returnOriginal: false
    }).then((res) => {

        console.log(res)
    })


    //client.close();
});