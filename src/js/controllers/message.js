angular
  .module('yabee')
  .controller('messagesNewCtrl', messagesNewCtrl)
  .controller('messagesIndexCtrl', messagesIndexCtrl);

messagesIndexCtrl.$inject = ['User', 'Advert', 'Offer', 'Message'];
function messagesIndexCtrl(User, Advert, Offer, Message) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();
}

messagesNewCtrl.$inject = ['User', 'Advert', 'Offer', 'Message', '$stateParams', 'tempService'];
function messagesNewCtrl(User, Advert, Offer, Message, $stateParams, tempService) {
  const vm = this;
  // vm.adverts = Advert.query();
  vm.offer = tempService.currentOffer;
  console.log(vm.offer);
  vm.offers = Offer.query($stateParams);
  // vm.messages = Message.query();
}
