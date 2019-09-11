const expect = require(`expect`);
const request = require(`supertest`);
const {ObjectID} = require(`mongodb`);

const {app} = require(`./../server`);
const {Todo} = require(`./../models/todo`);

const {todos, populateTodos, users, populateUsers} = require(`./seed/seed`);


// beforeEach( populateUsers);
beforeEach( populateTodos);

describe(`POST /todos`, () => {
    it('should create a new todo',  (done) => {
        var text = `Test todo text`;

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                //if
                if (err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    // console.log(todos.length);
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should not create todo with invalid body data',  (done) => {
        request(app)
            .post('/todos')
            .expect(400)
            .send({})
            .end((err, res) => {
                if (err){
                    return done(err)
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe((2));
                    done();
                }).catch((e) => {
                    done(e)
                })
            })
    });
});

describe('GET /todos', () => {
    it('should return all todos',  (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                //expect(res.body.todos.type).toBe(array);
                // expect(res.body.todos.length).toBe(2);
                expect(res.body.todos.length).toBe(2);
                // console.log(JSON.stringify(res.body.todos.length, undefined, 2))
            })
            .end(done);
    });
});

describe(`GET /todos/:id`, () => {
    it('should return todo doc',  (done) => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)//to convert object to string
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });


    it('should return a 404 if todo not found',  (done) => {
        //make sure you get a 404 back

        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object ids',  (done) =>  {

        request(app)
            .get('/todos/1223')
            .expect(404)
            .end(done)

    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo',  (done) => {

        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo._id).toBe(hexId);
            }).end((err, res) => {

                if (err){
                    return done(err);
                }

                //query db using find by ID using hexID
                Todo.findById(hexId).then( (todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done())


                //expecting (null) toNotExist
        });
    });

    it('should return 404 if todo not found',  (done) =>{

        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
    //
    it('should return 404 if object is invalid',  (done) => {

        request(app)
            .delete('/todos/1223')
            .expect(404)
            .end(done)
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo',  (done) => {
        //get id
        var hexID = todos[0]._id.toHexString();
        const text = "This is the new text 0";

        //update the text
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: true,
                text: text
            })
            .expect(200)
            .expect( ( res) => {
                expect(res.body.todos.text).toBe(text);
                expect(res.body.todos.completed).toBe(true);
                expect(res.body.todos.completedAt).tobeA('number');
            })
            .end(done);


        //set completed to true

        //assert you get 200

        //assert text is changed, completed is true and completedAt is a number
    });

    it('should clear completedAt when todo is not completed',  (done) => {
        //get the id

        //update the text, set completed is false

        //200

        //assert text is changed, completed false, completed at is null .toNotExist
        var hexID = todos[1]._id.toHexString();
        var text = "This is the new text 1";

        //update the text
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: false,
                text: text
            })
            .expect(200)

            .expect( ( res) => {
                expect(res.body.todos.text).toBe(text);
                expect(res.body.todos.completed).toBe(true);
                expect(res.body.todos.completedAt).toNotExist();
            })
            .end(done);



    });

});