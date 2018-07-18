const express = require('express');
let app = express();
const parser = require('body-parser');
const axios = require('axios');
let db = require('./../db/connection').connection
let authenticate = require('./../db/index').authenticate
let signup = require('./../db/index').signup
let save = require('./../db/index').save
let histSave = require('./../db/index').histSave

const helpers = require('./serverhelpers');

//********middleware and plugins*********
app.use(parser.json());
app.use(express.static(__dirname + '/../../dist'));

//*******GET/POST section*******

//profile search - example url: localhost:8080/search/?input=batman+begins
app.get('/search', (req, res) => {
  let movie = req.query.title;
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9e172c233cc489304e8cd6b8f340934e&language=en-US&page=1&include_adult=false&query=${movie}`)
    .then((response) => {
      let filtered = helpers.filterResults(response.data.results);
      res.status(200).send(filtered);
    })
    .catch((err) => console.log(err)); 
});

//profile save with tags
app.post('/save', (req, res) => {
  // save data to both the global movie table
  save(req.body, (err) => {
    if (err) console.error(err)
    else {
      histSave(req.body, (err) => {
        if (err) console.error(err)
        else res.status(200).send(req.body); 
      }) 
    }
  })

  //placeholder for testing
});

//*******Global Querying by Mood*******

//mood search - example url: localhost:8080/results/?moods=happy+sad+cool
app.get('/results/:moods?', (req, res) => {
  //creating an array with each mood that was sent with query
  var moods = req.query.moods.split(' ');
  // console.log(moods);

  res.status(200).send('received your query');
});

//*****Single User Functionality ******/

//get history for dynamic username parameter
//example url: localhost:8080/users/history/?username=parker
app.get('/users/history/:username?', (req, res) => {
  //this is how you grab the username from the url
  console.log(req.query.username);

  res.status(200).send(req.query);
});

//*******Authentication section*******
app.post('/login', (req, res) => {
  let username = req.body.username;
  authenticate(username, (err, data) => {
    if (err) console.error(err)
    else {
      let allowedAccess = false
      if (Object.keys(data).length > 1 && data.password === req.body.password) {
        allowedAccess = true
      }
      res.send(allowedAccess)
    }
  })
})

app.post('/signup', (req, res) => {
  signup({username: req.body.username, password: req.body.password, history: {}}, (err, response) => {
    if (err) console.log(err)
    else {
      res.send()
    }
  })
})


//*******server startup********
let port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening in on port: ', port));