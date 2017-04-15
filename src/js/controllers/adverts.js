angular
  .module('yabee')
  .controller('advertsIndexCtrl', advertsIndexCtrl);

advertsIndexCtrl.$inject = ['User', 'Advert', 'Offer', 'Message'];
function advertsIndexCtrl(User, Advert, Offer, Message) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();
}
