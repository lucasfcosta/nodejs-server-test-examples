const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();
const port = 8080;
const mongoHost = 'localhost:27017';

// Our Person model:
const Person = require('./models/person');
const User = require('./models/user');

// This connects to our MongoDB instance
mongoose.connect(mongoHost);

// Let's seed our DB with a few sample users
User.find({}).then(users => {
    if (users.length === 0) {
        new User({
            username: 'admin',
            password: 'example'
        }).save();
    }
}).catch(() => {
    console.log('There was an error seeding the DB.');
});

// We also neet to set a secret for encoding/decoding our JWTs
app.set('appSecret', 'super-secret-secret')

// This allows us to parse request's body
// so we can have it available later
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        message: 'Hello, world!'
    });
});

app.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then((user) => {
        if (user && user.password === req.body.password) {
            const token = jwt.sign(user, app.get('appSecret'));

            res.json({
                token
            });
        } else {
            res.status(401);
            res.json({
                message: 'Wrong username/password combination.'
            });
        }
    });
});


app.use((req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, sender) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.sender = sender;
        next();
      }
    });
  } else {
    res.status(403)
    res.send({
        message: 'Please provide a token'
    });
  }
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
