angular
  .module('yabee')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  // Statics ------------------------------------------------------

    .state('home', {
      url: '/',
      templateUrl: 'js/views/static/home.html',
      controller: 'homeCtrl as home'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'authCtrl as auth'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'authCtrl as auth'
    })
    // Advert ------------------------------------------------------

    .state('advertsIndex', {
      url: '/adverts',
      templateUrl: 'js/views/adverts/index.html',
      controller: 'advertsIndexCtrl as advertsIndex'
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
    })
    // Messages ------------------------------------------------------

    .state('messagesNew', {
      url: '/messagesNew',
      templateUrl: 'js/views/messages/new.html',
      controller: 'messagesNewCtrl as messagesNew'
    })
    .state('messagesIndex', {
      url: '/messages',
      templateUrl: 'js/views/messages/index.html',
      controller: 'messagesIndexCtrl as messagesIndex'
    })
  // Users ------------------------------------------------------

    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html',
      controller: 'usersIndexCtrl as usersIndex'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'js/views/users/show.html',
      controller: 'usersShowCtrl as usersShow'
    })
    // Offers ---------------------------------------------------------

    .state('offersIndex', {
      url: '/offers',
      templateUrl: 'js/views/offers/index.html',
      controller: 'offersIndexCtrl as offersIndex'
    })
    .state('offersShow', {
      url: '/offers/:id',
      templateUrl: 'js/views/offers/show.html',
      controller: 'offersShowCtrl as offersShow'
    })
    .state('offersEdit', {
      url: '/offers/:id/edit',
      templateUrl: 'js/views/offers/edit.html',
      controller: 'offersEditCtrl as offersEdit'
    })
    .state('offersNew', {
      url: '/offersNew',
      templateUrl: 'js/views/offers/new.html',
      controller: 'offersNewCtrl as offersNew'
    })
    // End of Offers -----------------------------------------------------
    ;

  $urlRouterProvider.otherwise('/');
}
