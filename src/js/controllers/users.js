angular
  .module('yabee')
  .controller('usersShowCtrl', usersShowCtrl)
  .controller('usersIndexCtrl', usersIndexCtrl);

usersIndexCtrl.$inject = ['User'];
function usersIndexCtrl(User) {
  const vm = this;
  vm.users = User.query();
}

usersShowCtrl.$inject = ['User', '$auth', '$http', '$stateParams', 'offerService', 'advertService', '$state', 'Offer'];
function usersShowCtrl(User, $auth, $http, $stateParams, offerService, advertService, $state, Offer) {
  const vm = this;


  User.get($stateParams)
  .$promise
  .then((user) => {
    vm.currentUser = user;
    vm.currentUser.messages = [];
    vm.currentUser.messages_sent.forEach((message) => vm.currentUser.messages.push(message));
    vm.currentUser.messages_recieved.forEach((message) => vm.currentUser.messages.push(message));
  });

  vm.messagesReplyToOffer = messagesReplyToOffer;
  function messagesReplyToOffer(offer, advertId) {
    console.log('ReplyToOffer');
    advertService.currentAdvert.id = advertId;
    offerService.currentOffer = offer;
    $state.go('messagesNew');
  }

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
