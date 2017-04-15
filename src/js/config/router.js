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
    });

  $urlRouterProvider.otherwise('/');
}
