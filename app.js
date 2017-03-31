const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send({
        message: 'Hello, world!'
    });
});

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})

module.exports = app;
