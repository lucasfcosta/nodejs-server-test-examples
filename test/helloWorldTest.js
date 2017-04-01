const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app.js');

describe('Hello World Route', () => {
    it('Returns a 200 response', (done) => {
        chai.request(app)
            .get('/')
            .then(response => {
                // Now let's check our response
                expect(response).to.have.status(200);
                done();
            })
            .catch(done);
    });

    // Let's add this to the same describe block to keep this file organized
    it('Returns a "Hello World" message', (done) => {
        chai.request(app)
            .get('/')
            .then(response => {
                expect(response.body).to.be.deep.equal({
                    message: 'Hello, world!'
                });
                done();
            })
            .catch(done);
    });
});
