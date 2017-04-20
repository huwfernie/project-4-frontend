angular
  .module('yabee')
  .controller('homeCtrl', homeCtrl);


// this returns all the Offers to display them on the homepage
homeCtrl.$inject = ['Offer'];
function homeCtrl(Offer) {
  const vm = this;
  vm.offers = Offer.query();

}
