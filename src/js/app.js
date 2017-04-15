// app.js is the main JS file which you should define your Angular module
angular
  .module('yabee', ['ngResource', 'ui.router'])
  .constant('API_URL', 'http://localhost:3000/api');
