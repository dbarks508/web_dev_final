// school website app

const path = require('path');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const { render } = require('ejs');
const mongoose = require('mongoose');
const Course = require('./models/course');

app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true }));

// const dbURI = 'mongodb+srv://dylanbarks:Cooliest7!@cluster0.zyumiwp.mongodb.net/?retryWrites=true&w=majority';
const dbURI = 'mongodb+srv://group:webdevfinal@cluster0.xgizzyz.mongodb.net/school-website?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('connected to db'))
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// sandbox routes to add and get courses
app.get('/add-course', (req, res) => {
    const course = new Course({
        subject: 'Spanish',
        credits: 3,
        description: 'learn a new language'
    });

    course.save()
    .then((result) => {
        res.send(result);
    });
});

app.get('/all-courses', (req, res) =>{
    Course.find()
    .then((result) => {
        res.send(result);
    });
});


// routes

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
    // const courses = [
    //     {subject: 'English Composition', credits: 4, description: 'Write stuff'},
    //     {subject: 'Algebra', credits: 4, description: 'Numbers and such'},
    //     {subject: 'Astronomy', credits: 3, description: 'Look at stars'}
    // ];

    // res.render('courses', { title: 'course list', courses} );

    // dsiplaying all courses in db
    Course.find()
    .then((result) => {
        res.render('courses', { courses: result })
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post('/courses', (req, res) => {
    const course = new Course(req.body);

    course.save()
      .then(result => {
        res.redirect('/courses');
      })
        .catch(err => {
            console.log(err); 
        });     
});
app.get('/courses/:id', (req, res) => {
    const id = req.params.id;
    Course.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Course Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  app.delete('/courses/:id', (req, res) => {
    const id = req.params.id;
    
    Course.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/courses' });
      })
      .catch(err => {
        console.log(err);
      });
  });
