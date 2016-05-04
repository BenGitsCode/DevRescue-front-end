'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');


const getFormFields = require('../../lib/get-form-fields');

const authApi = require('./auth/api');
const authUi = require('./auth/ui');
// const getFormFields not needed?? wtf??


  // User actions

  $('.sign-up').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.signUp(authUi.success, authUi.failure, data);
    console.log(data);
  });

  $('.sign-in').on('submit', function (event) {
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signIn(authUi.signInSuccess, authUi.failure, data);
    console.log(data);
  });

  $('.sign-out').on('click', function (event) {
    event.preventDefault();
    authApi.signOut(authUi.signOutSuccess, authUi.failure);
    console.log("signed out");
  });

  $('.change-password').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.changePass(authUi.success, authUi.failure, data);
    console.log(data);
  });

  // RESCUE actions

  $('.show-rescue').on('click', function (event) {
    event.preventDefault();
    authUi.showRescues(authUi.success, authUi.failure);
    console.log(authUi.currentUser);
  });

  $('#new-rescue').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.newRescue(authUi.success, authUi.failure, data);
    console.log(data);
    authUi.showRescues();
  });

  // adding rescue id to the submit button so it knows what object in rescues to edit

  $('.content').on('click', '.edit-rescue', function (event) {
    //   /////////////////// 'button' would also work, this is targeting the button with edit-rescue class
    event.preventDefault();
    // console.log($(this).attr('data-rescue-id'));
    let id = $(event.target).attr("data-rescue-id");
    $('.edit-rescue-btn').attr("data-rescue-id", id);
    // lines 72-73 define id as the attribute of clicked td
    // console.log(event.target);
  });

  // this stores id of cell clicked as attr to data-rescue-id
  $('#edit-rescue').on('submit', function (event) {
    event.preventDefault();
    let id = $('.edit-rescue-btn').attr("data-rescue-id");
    let data = getFormFields(this);
    console.log(data);
    authApi.editRescue(authUi.editRescueSuccess, authUi.failure, data, id);
  });
 //
 //  $('#edit-rescue').on('submit', function (event) {
 //   event.preventDefault();
 //   let id = $(event.target).attr("data-rescue-id");
 //   let data = getFormFields(this);
 //   console.log(data);
 //   authApi.editRescue(authUi.editRescueSuccess, authUi.failure, data, id);
 // });

  $('.delete-rescue-btn').on('click', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    let id = $(this).attr('data-rescue-id');
    console.log("delete this" + data);
    authApi.deleteRescue(authUi.deleteRescueSuccess, authUi.failure, data, id);
  });

  $('.content').on('click', '.delete-rescue', function (event) {
    //   /////////////////// 'button' would also work, this is targeting the button with edit-rescue class
    event.preventDefault();
    // console.log($(this).attr('data-rescue-id'));
    let id = $(event.target).attr("data-rescue-id");
    $('.delete-rescue-btn').attr("data-rescue-id", id);
    // lines 72-73 define id as the attribute of clicked td
    // console.log(event.target);
  });
