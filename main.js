// school website app

const path = require('path');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const { render } = require('ejs');
const mongoose = require('mongoose');
const Course = require('./models/course');
const User = require('./models/User');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const dbURI = 'mongodb+srv://group:webdevfinal@cluster0.xgizzyz.mongodb.net/school-website?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('connected to db'))
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// sandbox route to add course

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

// sandbox route to get all courses

app.get('/all-courses', (req, res) =>{
    Course.find()
    .then((result) => {
        res.send(result);
    });
});

// routes

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/addcourse', (req, res) => {
    res.render('addcourse');
});


app.get('/courses', (req, res) => {
  
  // display all courses
  
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
        res.render('details', { course: result });
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

//token function
const createToken = (id) => {

}


// auth routes 
app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create ({ email, password });
    res.status(201).json(user);
  }
  catch (err) {
    console.log(err.message, err.code);
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('user login');
});