angular
  .module('yabee')
  .controller('advertsIndexCtrl', advertsIndexCtrl)
  .controller('advertsNewCtrl', advertsNewCtrl)
  .controller('advertsShowCtrl', advertsShowCtrl)
  .controller('advertsEditCtrl', advertsEditCtrl);

advertsIndexCtrl.$inject = ['Advert'];
function advertsIndexCtrl(Advert) {
  const vm = this;
  vm.adverts = Advert.query();
}

advertsNewCtrl.$inject = ['User', 'Advert', '$state', '$auth'];
function advertsNewCtrl(User, Advert, $state, $auth) {
  const vm = this;
  vm.advert = {};
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });


  function advertsCreate() {
    vm.advert.user_id = vm.currentUser.id;
    Advert
      .save({ advert: vm.advert })
      .$promise
      .then((advert) => $state.go('advertsShow', { id: advert.id }));
  }
  vm.create = advertsCreate;
}

advertsShowCtrl.$inject = ['API_URL', '$stateParams', 'Advert', '$http', '$state', 'offerService', 'advertService', 'userService'];
function advertsShowCtrl(API_URL, $stateParams, Advert, $http, $state, offerService, advertService, userService) {
  const vm = this;

  vm.currentUser = userService.currentUser;

  Advert.get($stateParams)
  .$promise
  .then((temp) => {
    vm.advert = temp;
    $http({
      url: `${API_URL}/offers/search`,
      method: 'GET',
      params: {search: temp.title, valueMin: temp.valueMin, valueMax: temp.valueMax}
    })
    .then((response) => {
      vm.offers = response.data;
    });
  });
  vm.messagesNew = messagesNew;
  function messagesNew(offer, advert) {
    offerService.currentOffer = offer;
    advertService.currentAdvert = advert;
    $state.go('messagesNew');
  }
}

advertsEditCtrl.$inject = ['$stateParams', 'Advert', '$state'];
function advertsEditCtrl($stateParams, Advert, $state) {
  const vm = this;

  vm.advert = Advert.get($stateParams);

  function advertsDelete() {
    vm.advert
      .$remove()
      .then(() => $state.go('advertsIndex'));
  }
  vm.delete = advertsDelete;

  function advertsUpdate() {
    Advert
      .update({id: vm.advert.id, advert: vm.advert })
      .$promise
      .then(() => $state.go('advertsShow', { id: vm.advert.id }));
  }

  vm.update = advertsUpdate;
}
