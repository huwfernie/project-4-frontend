angular
  .module('yabee')
  .controller('messagesIndexCtrl', messagesIndexCtrl);

messagesIndexCtrl.$inject = ['User', 'Advert', 'Offer', 'Message'];
function messagesIndexCtrl(User, Advert, Offer, Message) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();
}
