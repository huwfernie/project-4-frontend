angular
  .module('yabee')
  .controller('usersIndexCtrl', usersIndexCtrl);

usersIndexCtrl.$inject = ['User', 'Advert', 'Offer', 'Message'];
function usersIndexCtrl(User, Advert, Offer, Message) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();
}
