angular
  .module('yabee')
  .controller('usersShowCtrl', usersShowCtrl)
  .controller('usersIndexCtrl', usersIndexCtrl);

usersIndexCtrl.$inject = ['User'];
function usersIndexCtrl(User) {
  const vm = this;
  vm.users = User.query();
}

usersShowCtrl.$inject = ['User', '$auth', '$http', '$stateParams', 'offerService', 'advertService', '$state', 'Message'];
function usersShowCtrl(User, $auth, $http, $stateParams, offerService, advertService, $state, Message) {
  const vm = this;
  vm.toggleReply = false;
  vm.tab = 1;

  function getCurrentUser() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((user) => {
        vm.currentUser = user;
      });
  }
  getCurrentUser();
  // User.get($stateParams)
  // .$promise
  // .then((user) => {
  //   vm.currentUser = user;
  // });

  vm.setTab = setTab;
  function setTab(x){
    vm.tab = x;
  }

  // this function runs when you click reply from a recieved message, it sets all the inital values for the reply
  vm.setupReply = setupReply;
  function setupReply(message) {
    console.log('ReplyToOffer');
    vm.toggleReply = !vm.toggleReply;
    vm.reply = {
      subject: `re: ${message.subject}`,
      body: 'Your text here',
      sender_id: message.reciever_id,
      reciever_id: message.sender_id,
      advert_id: message.advert_id,
      offer_id: message.offer_id
    };
  }

  // this saves the reply message and then resets the reply to be an empty {}
  vm.replyToMessage = replyToMessage;
  function replyToMessage() {
    console.log('replyToMessage');
    Message
      .save({ message: vm.reply})
      .$promise
      .then(() => {
        vm.currentUser.messages.push(vm.reply);
        vm.reply = {};
      });
  }

  vm.clearReply = clearReply;
  function clearReply() {
    vm.reply = {};
  }
}
