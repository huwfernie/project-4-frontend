angular
  .module('yabee')
  .service('offerService', offerService);

offerService.$inject = [];
function offerService() {
  const vm = this;
  vm.currentOffer =  '' ;
}
//
// offerService.$inject = ['$window'];
// function offerService($window) {
//   this.getTrack = function getTrack() {
//     return JSON.parse($window.localStorage.getItem('track'));
//   };
//
//   this.setTrack = function setTrack(track) {
//     return $window.localStorage.setItem('track', JSON.stringify(track));
//   };
// }
