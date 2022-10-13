// school website app

const path = require('path');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const { render } = require('ejs');
const mongoose = require('mongoose');
const Course = require('./models/course');
const User = require('./models/User');
const Cart = require('./models/cart')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { requireAuth } = require('./middleware/authMiddleware');

app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// db connnection 
const dbURI = 'mongodb+srv://group:webdevfinal@cluster0.xgizzyz.mongodb.net/school-website?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('connected to db'))
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// sandbox routes
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/addcourse', requireAuth, (req, res) => {
    res.render('addcourse');
});

app.get('/cart', requireAuth, (req, res) => {
  res.render('cart');
})

// display all courses
app.get('/courses', requireAuth, (req, res) => {
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

  app.post('/cart', (req, res) => {
    const cart = new Cart(req.body);

    cart.save()
      .then(result => {
        res.redirect('cart')
      })
        .catch(err => {
            console.log(err); 
        });  
  });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//token function
const maxAge = 3 * 24 * 60 *60;

const createToken = (id) => {
  return jwt.sign({ id }, 'super secret', {
    expiresIn: maxAge
  });
};

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
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id});
  }
  catch (err) {
    console.log(err.message, err.code);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    res.status(400).json({});
  }
});