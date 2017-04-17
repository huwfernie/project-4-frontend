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

messagesNewCtrl.$inject = ['User', 'Advert', 'Offer', 'Message', '$stateParams', 'tempService', '$auth', '$state'];
function messagesNewCtrl(User, Advert, Offer, Message, $stateParams, tempService, $auth, $state) {
  const vm = this;
  vm.message = {
    'subject': 'Test',
    'body': 'test',
    'sender_id': 1,
    'reciever_id': 2
  };

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  // get currentOffer from the tempService and set it to vm.offer
  vm.offer = tempService.currentOffer;
  vm.message.subject = `re: ${tempService.currentOffer.title}`;

  function create() {
    vm.message.sender_id = vm.currentUser.id;
    vm.message.reciever_id = tempService.currentOffer.id;

    Message
      .save({ message: vm.message})
      .$promise
      .then(() => $state.go('messagesIndex'));
  }
  vm.create = create;
}
