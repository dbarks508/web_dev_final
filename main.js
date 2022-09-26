const path = require('path');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/addcourse', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/addcourse.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/signup.html'));
});

app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/courses.html'));
});

