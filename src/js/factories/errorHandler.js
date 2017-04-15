angular
  .module('yabee')
  .factory('ErrorHandler', ErrorHandler);

ErrorHandler.$inject = ['$rootScope'];
function ErrorHandler($rootScope) {
  return {
    responseError: function(err) {
      $rootScope.$broadcast('error', err);
    }
  };
}
