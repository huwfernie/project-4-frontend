angular
  .module('yabee')
  .controller('usersShowCtrl', usersShowCtrl)
  .controller('usersIndexCtrl', usersIndexCtrl);

usersIndexCtrl.$inject = ['User', 'Advert', 'Offer', 'Message'];
function usersIndexCtrl(User, Advert, Offer, Message) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();
}

usersShowCtrl.$inject = ['User', 'Advert', 'Offer', 'Message', '$auth', '$http', '$stateParams'];
function usersShowCtrl(User, Advert, Offer, Message, $auth, $http, $stateParams) {
  const vm = this;

  // switch between these two so that usersShow will only show the currently logged in user.
  // if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
  vm.currentUser = User.get($stateParams);

  // I don't need this because the data is already embedded in the user JSON from the server.
  // $http({
  //   url: '//localhost:3000/api/offers/myOffers',
  //   method: 'GET',
  //   params: {id: vm.currentUser.id}
  // })
  // .then((response) => {
  //   vm.offers = response.data;
  // });
}
