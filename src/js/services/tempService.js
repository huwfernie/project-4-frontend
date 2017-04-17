angular
  .module('yabee')
  .service('tempService', tempService);

tempService.$inject = [];
function tempService() {
  const vm = this;
  vm.currentOffer =  '' ;
}
//
// tempService.$inject = ['$window'];
// function tempService($window) {
//   this.getTrack = function getTrack() {
//     return JSON.parse($window.localStorage.getItem('track'));
//   };
//
//   this.setTrack = function setTrack(track) {
//     return $window.localStorage.setItem('track', JSON.stringify(track));
//   };
// }
