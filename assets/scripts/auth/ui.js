'use strict';

const app = require('../app-data');
// const newGame = require('./index.js');
const authApi = require('./api');

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
  currentUser.token = "";
  currentUser.id = undefined;
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
let rescueUrl = [];
if (authApi.rescue) {
for (var i = 0; i < authApi.rescues.length; i++) {
  rescueUrl.append([i].rescue.url);
}
}

// this shows rescues by appending the template
const showRescues = (rescues) => {
  let rescueListingTemplate = require('../templates/rescue-show.handlebars');
    // console.log(rescues.rescueUrl);
    console.log(rescues);
    $('.content').append(rescueListingTemplate({rescues, rescueUrl}));
    $('.edit-rescue').on('click', function(event){
      event.preventDefault();
    $('#edit-rescue-modal').modal('show');
    // $('.content').empty  //this makes the content div empty after an edit
    localStorage.setItem('ID', $(this).attr('data-rescue-id'));
});
};


const editRescueSuccess = (data) => {
  console.log("you edited this!");
  console.log(data);
  $('#edit-rescue-modal').modal('hide');
};

const deleteRescueSuccess = (data) => {
  $('#delete-rescue-modal').modal('hide');
  console.log("you deleted things!");
  console.log(data);
};

module.exports = {
  failure,
  success,
  signOutSuccess,
  signInSuccess,
  app,
  currentUser,
  showRescues,
  editRescueSuccess,
  deleteRescueSuccess
};
