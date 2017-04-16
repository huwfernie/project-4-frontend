angular
  .module('yabee')
  .controller('advertsIndexCtrl', advertsIndexCtrl)
  .controller('advertsNewCtrl', advertsNewCtrl);

advertsIndexCtrl.$inject = ['User', 'Advert', 'Offer', 'Message'];
function advertsIndexCtrl(User, Advert, Offer, Message) {
  const vm = this;
  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();
}

advertsNewCtrl.$inject = ['User', 'Advert', 'Offer', 'Message', '$state', '$auth'];
function advertsNewCtrl(User, Advert, Offer, Message, $state, $auth) {
  const vm = this;
  vm.advert = {};
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });



  vm.users = User.query();
  vm.adverts = Advert.query();
  vm.offers = Offer.query();
  vm.messages = Message.query();

  function advertsCreate() {
    vm.advert.user_id = vm.currentUser.id;
    Advert
      .save({ advert: vm.advert })
      .$promise
      .then(() => $state.go('advertsIndex'));
  }
  vm.create = advertsCreate;
}
