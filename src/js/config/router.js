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
        templateUrl: 'js/views/events/index.html',
        controller: 'MessageIndexCtrl as messageIndex'
      })
      .state('usersIndex', {
        url: '/events/new',
        templateUrl: 'js/views/events/new.html',
        controller: 'usersIndexCtrl as usersIndex'
      })
      .state('advertsIndex', {
        url: '/events/:id',
        templateUrl: 'js/views/events/show.html',
        controller: 'advertsIndexCtrl as advertsIndex'
      })
      .state('offersIndex', {
        url: '/events/:id',
        templateUrl: 'js/views/events/show.html',
        controller: 'offersIndexCtrl as offersIndex'
      });

    $urlRouterProvider.otherwise('/');
  }
