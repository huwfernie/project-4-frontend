angular
  .module('yabee')
  .controller('offersIndexCtrl', offersIndexCtrl)
  .controller('offersEditCtrl', offersEditCtrl)
  .controller('offersNewCtrl', offersNewCtrl)
  .controller('offersShowCtrl', offersShowCtrl)
  .controller('offersSearchCtrl', offersSearchCtrl);

offersIndexCtrl.$inject = ['Offer'];
function offersIndexCtrl(Offer) {
  const vm = this;
  vm.offers = Offer.query();
}

offersShowCtrl.$inject = ['Offer', '$stateParams', 'userService', 'User', '$auth'];
function offersShowCtrl(Offer, $stateParams, userService, User, $auth) {
  const vm = this;

  if (!userService.currentUser.id) {
    if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
  } else {
    vm.currentUser = userService.currentUser;
  }

  vm.offer = Offer.get($stateParams);
}

offersEditCtrl.$inject = ['Offer', '$stateParams', '$state', 'userService', 'User', '$auth'];
function offersEditCtrl(Offer, $stateParams, $state, userService, User, $auth) {
  const vm = this;

  vm.offer = Offer.get($stateParams);

  if (!userService.currentUser.id) {
    if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
  } else {
    vm.currentUser = userService.currentUser;
  }

  function offersUpdate() {
    Offer
      .update({id: vm.offer.id, offer: vm.offer })
      .$promise
      .then(() => $state.go('offersShow', { id: vm.offer.id }));
  }
  vm.update = offersUpdate;


  function offersDelete() {
    vm.offer
      .$remove()
      .then(() => $state.go('profile', ({id: vm.currentUser.id})));
  }
  vm.delete = offersDelete;

}

offersNewCtrl.$inject = ['Offer', '$stateParams', '$state', '$auth', 'User'];
function offersNewCtrl(Offer, $stateParams, $state, $auth, User) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.offer = {};

  function create() {
    console.log(vm.currentUser);
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((user)=> {
        vm.offer.user_id = user.id;
        Offer
          .save({ offer: vm.offer })
          .$promise
          .then((result) => $state.go('offersShow', { id: result.id }));
      });
  }
  vm.create = create;
}

offersSearchCtrl.$inject = ['API_URL', '$state', '$http', '$stateParams'];
function offersSearchCtrl(API_URL, $state, $http, $stateParams) {
  const vm = this;

  $http({
    url: `${API_URL}/offers/search`,
    method: 'GET',
    params: {
      search: $stateParams.query,
      valueMin: 0,
      valueMax: 1000000
    }
  })
  .then((response) => {
    vm.offers = response.data;
  });
}
