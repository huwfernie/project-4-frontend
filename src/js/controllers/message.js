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

messagesNewCtrl.$inject = ['User', 'Advert', 'Offer', 'Message', '$stateParams', 'offerService', 'advertService', '$auth', '$state'];
function messagesNewCtrl(User, Advert, Offer, Message, $stateParams, offerService, advertService, $auth, $state) {
  const vm = this;
  vm.message = {
    'subject': 'Test',
    'body': 'test',
    'sender_id': 1,
    'reciever_id': 2,
    'advert_id': advertService.currentAdvert.id,
    'offer_id': offerService.currentOffer.id
  };

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  // get currentOffer from the offerService and set it to vm.offer
  vm.offer = offerService.currentOffer;
  console.log(vm.offer);
  vm.message.subject = `re: ${offerService.currentOffer.title}`;

  function create() {
    vm.message.sender_id = vm.currentUser.id;
    vm.message.reciever_id = offerService.currentOffer.user_id;

    Message
      .save({ message: vm.message})
      .$promise
      .then(() => $state.go('usersShow', ({id: vm.currentUser.id})));
  }
  vm.create = create;
}
