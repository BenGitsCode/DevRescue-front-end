'use strict';

const app = require('../app-data');
// const newGame = require('./index.js');
const authApi = require('./api');




//display Rescues function used in getAlbums api ajax call for GET below this.
// Passes rescues object to handlebars. Called by getAblums
let displayRescues = function(rescues){
    $('.landing-div').hide(); //this hides the landing page div
    $('.content').html(''); //this clears the content in my table html
  let rescuesDisplayTemplate = require('../templates/rescue-show.handlebars');
  console.log("dispaly rescues", rescues);
    $('.content').append(rescuesListingTemplate({
      rescues : rescues.rescues
    }));
    //when rescue panel is clicked to open edit modal
    $('.edit-rescue').on('click', function() {
      //load clicked rescue ID from data-attribute into local storage for use in auth/api.editAlbum call
      localStorage.setItem('ID', $(this).attr('data-attribute'));
      //sets value of 'edit rescue' fields so that they don't default to empty
      $('#editAlbumTitle').val($(this).find('.rescue-title').text());
      $('#editAlbumArtist').val($(this).find('.rescue-artist').text());
      $('#editAlbumThoughts').val($(this).find('.rescue-thoughts').text());
      $('#editAlbumModal').modal('show');
      //adds rescue info to the rescue cover fields
      $('#rescueCoverTitle').val($(this).find('.rescue-title').text());
      $('#rescueCoverArtist').val($(this).find('.rescue-artist').text());
      if ($('.cover-image').attr('src') !== ''){
        $('.delete-cover').show();
      }
      });
    //shows add rescue modal
    $('.open-new-rescue').on('click', function(event){
      event.preventDefault();
      $('#newAlbumModal').modal('show');
  });
};


// Moved ajasx get for rescues from api to here
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
  .done(function(rescues){
    console.log('get rescue successful');
  displayRescues(rescues);
});
};


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
