const expect = require(`expect`);
const request = require(`supertest`);

const {app} = require(`./../server`);
const {Todo} = require(`./../models/todo`);


const testTodos = [{
    text: 'First test todo'
},{
    text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(testTodos);
    }).then( () => done());
});

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