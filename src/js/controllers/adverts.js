angular
  .module('yabee')
  .controller('advertsIndexCtrl', advertsIndexCtrl)
  .controller('advertsNewCtrl', advertsNewCtrl)
  .controller('advertsShowCtrl', advertsShowCtrl);

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
      // I would like to go to the show page straight from advertsNew - but I can't find the id!
      // .then(() => $state.go('advertsShow', { id: vm.advert.id }));
  }
  vm.create = advertsCreate;
}

advertsShowCtrl.$inject = ['$stateParams', 'Advert', '$state'];
function advertsShowCtrl($stateParams, Advert, $state) {
  const vm = this;
  // I can't get this working with $stateParams for now!
  // vm.advert = Advert.get($stateParams);
  vm.advert = Advert.get({id: 4});

  function advertsDelete() {
    vm.advert
      .$remove()
      .then(() => $state.go('advertsIndex'));
  }

  vm.delete = advertsDelete;


}
