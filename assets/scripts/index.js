'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// const getFormFields = require('../../../lib/get-form-fields.js');

const authApi = require('./auth/api');
const authUi = require('./auth/ui');




  $('#sign-up').on('submit', function (event) {
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
