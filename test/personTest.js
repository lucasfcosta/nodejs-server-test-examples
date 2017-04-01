const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const Person = require('../models/person');

chai.use(chaiHttp);

const app = require('../app.js');

describe('Person', () => {

    beforeEach((done) => {
        mongoose.connection.db.dropDatabase(done)
    })

    describe('Create Person', () => {
        it('Returns a 200 response', (done) => {
            chai.request(app)
                .post('/person')
                .send({
                    name: 'John Doe',
                    phone: '1-800 999',
                    email: 'johndoe@example.com',
                    dogs: 2
                })
                .then(response => {
                    // Now let's check our response
                    expect(response).to.have.status(200);
                    done();
                })
                .catch(done);
        });

        it('Creates a person document in our DB', (done) => {
            chai.request(app)
                .post('/person')
                .send({
                    name: 'John Doe',
                    phone: '1-800 999',
                    email: 'johndoe@example.com',
                    dogs: 2
                })
                .then(() => {
                    return Person.find({
                        email: 'johndoe@example.com'
                    });
                })
                .then(result => {
                    expect(result).to.have.lengthOf(1);

                    const person = result[0];
                    expect(person.name).to.be.equal('John Doe');
                    expect(person.phone).to.be.equal('1-800 999');
                    expect(person.dogs).to.be.equal(2);
                    done();
                })
                .catch(done);
        });
    });
});
