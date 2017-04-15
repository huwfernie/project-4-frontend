angular
  .module('yabee')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['User', 'Advert', 'Offer', 'Message', '$rootScope'];
function MainCtrl(User, Advert, Offer, Message, $rootScope) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();
  $rootScope.$on('error', (e, err) => {
    console.log(e, err);
  });
}
