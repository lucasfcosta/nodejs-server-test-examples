const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();
const port = 8080;
const mongoHost = 'localhost:27017';

// Our Person model:
const Person = require('./models/person');

// This connects to our MongoDB instance
mongoose.connect(mongoHost);

// This allows us to parse request's body
// so we can have it available later
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        message: 'Hello, world!'
    });
});

app.post('/person', (req, res) => {
    new Person({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        dogs: req.body.dogs
    }).save()
    .then(() => {
        res.send({
            message: 'Person saved successfully!'
        });
    })
    .catch(() => {
        res.send({
            message: 'Ooops! There was an error saving this person.'
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})

module.exports = app;
