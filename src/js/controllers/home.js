angular
  .module('yabee')
  .controller('homeCtrl', homeCtrl);


// this returns all the Offers to display them on the homepage
homeCtrl.$inject = ['Offer', '$state', 'offerService'];
function homeCtrl(Offer, $state, offerService) {
  const vm = this;
  vm.offers = Offer.query();

  vm.search = search;
  function search() {
    offerService.query = vm.query;
    $state.go('offersSearch');
  }
}
