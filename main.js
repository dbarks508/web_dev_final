const path = require('path');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const { render } = require('ejs');
const mongoose = require('mongoose')

app.use(express.static(__dirname + '/views'));

const dbURI = 'mongodb+srv://dylanbarks:Cooliest7!@cluster0.zyumiwp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .then(console.log('connected to db'));

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
    // res.sendFile(path.join(__dirname + '/views/courses.html'));
    const courses = [
        {subject: 'English Composition', credits: '4 Credit hours'},
        {subject: 'Algebra', credits: '4 credit hours'},
        {subject: 'Astronomy', credits: '3 credit hours'}
    ];

    res.render('courses', { title: 'course list', courses} );
});

