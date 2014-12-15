var express = require('express');
var app = express();

app.set('title', 'React Othello');

app.get('/', function (req, res) {
    res.send('hello');
});

app.listen(3000);

console.log('Server started: http://localhost:3000');
