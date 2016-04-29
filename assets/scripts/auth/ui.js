'use strict';

const app = require('../app-data');
// const newGame = require('./index.js');

let currentUser = {
  token:'',
  id: undefined
};

const signInSuccess = (data) => {
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  console.log(app);
  console.log("Sign in successful");
};

const signOutSuccess = () => {
  app.user = null;
  console.log(app);
  console.log("You signed OUT bro. Sweet!");
};

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

// this function gets handlebars template and appends it to my html
const showRescues = (rescues) => {
  let rescueListingTemplate = require('../templates/rescue-show.handlebars');
    $('.content').append(rescueListingTemplate({rescues}));
};

module.exports = {
  failure,
  success,
  signOutSuccess,
  signInSuccess,
  app,
  currentUser,
  showRescues
};
