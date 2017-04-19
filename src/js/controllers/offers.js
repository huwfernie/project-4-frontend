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
// ---------------------------------------------
// advertsShowCtrl.$inject = ['API_URL', '$stateParams', 'Advert', '$http', '$state', 'offerService'];
// function advertsShowCtrl(API_URL, $stateParams, Advert, $http, $state, offerService) {
//   const vm = this;
//   Advert.get($stateParams)
//   .$promise
//   .then((temp) => {
//     vm.advert = temp;
//     $http({
//       url: `${API_URL}/offers/search`,
//       method: 'GET',
//       params: {search: temp.title, valueMin: temp.valueMin, valueMax: temp.valueMax}
//     })
//     .then((response) => {
//       vm.offers = response.data;
//     });
//   });
//   vm.messagesNew = messagesNew;
//   function messagesNew(offer) {
//     offerService.currentOffer = offer;
//     $state.go('messagesNew');
//   }
// }
// --------------------------------------------

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
          .then((result) => $state.go('offersShow', { id: result.id }));
      });
  }
  vm.create = create;

}
