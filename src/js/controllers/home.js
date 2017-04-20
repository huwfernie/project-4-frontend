angular
  .module('yabee')
  .controller('homeCtrl', homeCtrl);


// this returns all the Offers to display them on the homepage
homeCtrl.$inject = ['Offer', '$state'];
function homeCtrl(Offer, $state) {
  const vm = this;
  vm.offers = Offer.query();

  vm.search = search;
  function search() {
    $state.go('offersSearch');
  }
}
