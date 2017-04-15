angular
  .module('yabee')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['User'];
function MainCtrl(User) {
  const vm = this;
  vm.users = User.query();
}
