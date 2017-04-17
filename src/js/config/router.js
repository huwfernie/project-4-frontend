angular
  .module('yabee')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/static/home.html'
    })
    .state('advertsNew', {
      url: '/advertsNew',
      templateUrl: 'js/views/adverts/new.html',
      controller: 'advertsNewCtrl as advertsNew'
    })
    .state('advertsShow', {
      url: '/adverts/:id',
      templateUrl: 'js/views/adverts/show.html',
      controller: 'advertsShowCtrl as advertsShow'
    })
    .state('advertsEdit', {
      url: '/adverts/:id/edit',
      templateUrl: 'js/views/adverts/edit.html',
      controller: 'advertsEditCtrl as advertsEdit'
    })// this is where temp. changes start
    .state('messagesIndex', {
      url: '/messages',
      templateUrl: 'js/views/messages/index.html',
      controller: 'messagesIndexCtrl as messagesIndex'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html',
      controller: 'usersIndexCtrl as usersIndex'
    })
    .state('advertsIndex', {
      url: '/adverts',
      templateUrl: 'js/views/adverts/index.html',
      controller: 'advertsIndexCtrl as advertsIndex'
    })
    .state('offersIndex', {
      url: '/offers',
      templateUrl: 'js/views/offers/index.html',
      controller: 'offersIndexCtrl as offersIndex'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'AuthCtrl as auth'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'AuthCtrl as auth'
    });

  $urlRouterProvider.otherwise('/');
}
