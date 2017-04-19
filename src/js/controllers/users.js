angular
  .module('yabee')
  .controller('usersShowCtrl', usersShowCtrl)
  .controller('usersIndexCtrl', usersIndexCtrl);

usersIndexCtrl.$inject = ['User'];
function usersIndexCtrl(User) {
  const vm = this;
  vm.users = User.query();
}

usersShowCtrl.$inject = ['User', '$auth', '$http', '$stateParams', 'offerService', '$state'];
function usersShowCtrl(User, $auth, $http, $stateParams, offerService, $state) {
  const vm = this;


  User.get($stateParams)
  .$promise
  .then((user) => {
    vm.currentUser = user;
    vm.currentUser.messages = [];
    vm.currentUser.messages_sent.forEach((message) => vm.currentUser.messages.push(message));
    vm.currentUser.messages_recieved.forEach((message) => vm.currentUser.messages.push(message));
  });

  vm.messagesNew = messagesNew;
  function messagesNew(offer) {
    offerService.currentOffer = offer;
    $state.go('messagesNew');
  }
}
