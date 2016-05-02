'use strict';

const app = require('../app-data');
const ui = require('./ui');


const signUp = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + '/sign-up',
    data,

  })
  .done(success)
  .fail(failure);

};

const signIn = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + '/sign-in',
    data,
    dataProcessing: false,

  }).done(success)
    .fail(failure);
};

const signOut = (success, failure) => {
  $.ajax({
    method: "DELETE",
    url: app.api + '/sign-out/' + ui.currentUser.id,
    headers: {
      Authorization: 'Token token='+ ui.currentUser.token,
    },
  })
  .done(success)
  .fail(failure);
};

const changePass = (success, failure, data) => {
  $.ajax({
    method: "PATCH",
    url: app.api + '/change-password/' + ui.currentUser.id,
    data,
    headers: {
      Authorization: 'Token token='+ ui.currentUser.token,
    },
  })
  .done(success)
  .fail(failure);
};

const newRescue = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api +'/users/' + ui.currentUser.id +'/rescues/',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + ui.currentUser.token
    },
    data: {
      "rescue": {
        "title": data.rescue.title,
        "url": data.rescue.url,
        "tag": data.rescue.tag,
      }
    }
  })
  .done(success)
  .fail(failure);
};

const showRescue = (success, failure) => {
  $.ajax({
    method: "GET",
    url: app.api +'/users/' + ui.currentUser.id +'/rescues/',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + ui.currentUser.token
    },
    // data: {
    //   "rescue": {
    //     "title": rescue.title,
    //     "url": rescue.url,
    //     "tag": rescue.tag,
    //   }
    // }
  })
  .done(success)
  .fail(failure);
};

//Update Rescue
const editRescue = (success, failure, data, id) => {
    console.log(data);
  let rescue_id = localStorage.getItem('ID');
  $.ajax({
    method: 'PATCH',
    url: app.api + 'rescues/' + rescue_id,
    data,
    headers:{
      Authorization: "Token token=" + ui.currentUser.token,
    },
  }).done(success)
  .fail(failure);
};



module.exports = {
  signUp,
  signIn,
  signOut,
  changePass,
  newRescue,
  showRescue,
  editRescue
};
