angular
  .module('yabee')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['User', 'Advert'];
function MainCtrl(User, Advert) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
}
