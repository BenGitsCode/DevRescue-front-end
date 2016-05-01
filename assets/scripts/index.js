'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// const getFormFields = require('../../../lib/get-form-fields.js');

const authApi = require('./auth/api');
const authUi = require('./auth/ui');


  // User actions

  $('.sign-up').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.signUp(authUi.success, authUi.failure, data);
    console.log(data);
  });

  $('#sign-in').on('submit', function (event) {
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signIn(authUi.signInSuccess, authUi.failure, data);
    console.log(data);
  });

  $('#sign-out').on('click', function (event) {
    event.preventDefault();
    authApi.signOut(authUi.signOutSuccess, authUi.failure);
    console.log("signed out");
  });

  $('#change-password').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.changePass(authUi.success, authUi.failure, data);
    console.log(data);
  });

  // RESCUE actions

  $('#show-rescue').on('click', function (event) {
    event.preventDefault();
    authApi.showRescue(authUi.showRescues, authUi.failure);
    console.log(authUi.currentUser);
  });

  $('#new-rescue').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.newRescue(authUi.success, authUi.failure, data);
    console.log(data);
  });

  // $('#edit-rescue').on('submit', function (event) {
  //   event.preventDefault();
  //   let data = getFormFields(this);
  //   authApi.editRescue(authUi.editRescue, authUi.failure, data);
  //   console.log(data);
  // });
