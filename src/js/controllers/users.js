angular
  .module('yabee')
  .controller('usersShowCtrl', usersShowCtrl)
  .controller('usersIndexCtrl', usersIndexCtrl);

usersIndexCtrl.$inject = ['User'];
function usersIndexCtrl(User) {
  const vm = this;
  vm.users = User.query();
}

usersShowCtrl.$inject = ['User', '$auth', '$http', '$stateParams', 'offerService', 'advertService', '$state', 'Offer', 'Message'];
function usersShowCtrl(User, $auth, $http, $stateParams, offerService, advertService, $state, Offer, Message) {
  const vm = this;


  User.get($stateParams)
  .$promise
  .then((user) => {
    vm.currentUser = user;
    // I could do this in the back end, not sure which is better
    vm.currentUser.messages = [];
    vm.currentUser.messages_sent.forEach((message) => vm.currentUser.messages.push(message));
    vm.currentUser.messages_recieved.forEach((message) => vm.currentUser.messages.push(message));
  });

  // this function runs when you click reply from a recieved message, it sets all the inital values for the reply
  vm.setupReply = setupReply;
  function setupReply(message) {
    console.log('ReplyToOffer');
    vm.reply = {
      'subject': `re: ${message.subject}`,
      'body': 'Your text here',
      'sender_id': message.reciever_id,
      'reciever_id': message.sender_id,
      'advert_id': message.advert_id,
      'offer_id': message.offer_id
    };
  }

  vm.replyToMessage = replyToMessage;
  function replyToMessage() {
    console.log('replyToMessage');
    Message
      .save({ message: vm.reply})
      .$promise
      .then(() => vm.reply = {} );
  }


  // probably won't need this much longer
  vm.messagesReplyToAdvert = messagesReplyToAdvert;
  function messagesReplyToAdvert(offerId) {
    console.log('ReplyToAdvert');
    Offer.get({id: offerId})
    .$promise
    .then((offer)=>  {
      offerService.currentOffer = offer;
      $state.go('messagesNew');
    });
  }
}
