angular
  .module('yabee')
  .controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['Offer'];
function homeCtrl(Offer) {
  const vm = this;
  vm.offers = Offer.query();
}
