angular
  .module('yabee')
  .controller('offersIndexCtrl', offersIndexCtrl)
  .controller('offersEditCtrl', offersEditCtrl)
  .controller('offersNewCtrl', offersNewCtrl)
  .controller('offersShowCtrl', offersShowCtrl);

offersIndexCtrl.$inject = ['Offer'];
function offersIndexCtrl(Offer) {
  const vm = this;
  vm.offers = Offer.query();
}

offersShowCtrl.$inject = ['Offer', '$stateParams'];
function offersShowCtrl(Offer, $stateParams) {
  const vm = this;

  vm.offer = Offer.get($stateParams);

}

offersEditCtrl.$inject = ['Offer', '$stateParams', '$state'];
function offersEditCtrl(Offer, $stateParams, $state) {
  const vm = this;

  vm.offer = Offer.get($stateParams);

  function offersUpdate() {
    Offer
      .update({id: vm.offer.id, offer: vm.offer })
      .$promise
      .then(() => $state.go('offersShow', { id: vm.offer.id }));
  }
  vm.update = offersUpdate;


  function offersDelete() {
    // const id = vm.offer.user_id;
    // help, this doesn't work but it's identical to advert and it works in insomnia
    vm.offer
      .$remove()
      .then(() => $state.go('offersIndex'));
      // .then(() => $state.go('usersShow', ({id: id})));
  }
  vm.delete = offersDelete;
}

offersNewCtrl.$inject = ['Offer', '$stateParams', '$state'];
function offersNewCtrl(Offer, $stateParams, $state) {
  const vm = this;

  vm.offer = {};

  function create() {
    Offer
      .save({ offer: vm.offer })
      .$promise
      .then((result) => $state.go('offersShow', { id: result.id })); // this line might not work
  }
  vm.create = create;

}
