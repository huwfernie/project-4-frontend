angular
  .module('yabee')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['User', 'Advert', 'Offer', 'Message', '$rootScope', '$state'];
function MainCtrl(User, Advert, Offer, Message, $rootScope, $state) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();
  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message;
    $state.go('login');
  });
}
