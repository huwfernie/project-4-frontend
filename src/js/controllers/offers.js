angular
  .module('yabee')
  .controller('offersIndexCtrl', offersIndexCtrl);

offersIndexCtrl.$inject = ['User', 'Advert', 'Offer', 'Message'];
function offersIndexCtrl(User, Advert, Offer, Message) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();
}
