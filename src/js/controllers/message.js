angular
  .module('yabee')
  .controller('messagesNewCtrl', messagesNewCtrl);


messagesNewCtrl.$inject = ['User', 'Message', '$stateParams', 'offerService', 'advertService', '$auth', '$state'];
function messagesNewCtrl(User, Message, $stateParams, offerService, advertService, $auth, $state) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.message = {
    subject: 'Test',
    body: 'test',
    sender_id: vm.currentUser.id,
    reciever_id: offerService.currentOffer.user_id,
    advert_id: advertService.currentAdvert.id,
    offer_id: offerService.currentOffer.id
  };

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
