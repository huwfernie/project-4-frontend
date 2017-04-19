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

offersNewCtrl.$inject = ['Offer', '$stateParams', '$state', '$auth', 'User'];
function offersNewCtrl(Offer, $stateParams, $state, $auth, User) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  // Offer.create!(title: "Blender that looks like a bicycle"
  //  body: "A blender that looks like a BIKE"
  //   I wonder if this will show up in any search results."
  //    user: mike
  //     value: 100
  //      image: "https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/LNkAAOSw3utY71gq/$_86.JPG" )

  vm.offer = {
    'title': 'TEST',
    'body': 'test',
    'image': 'picture',
    'value': 24
  };


  function create() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((user)=> {
        vm.offer.user_id = user.id;
        Offer
          .save({ offer: vm.offer })
          .$promise
          .then((result) => $state.go('offersShow', { id: result.id })); // this line might not work
      });
  }
  vm.create = create;

}
