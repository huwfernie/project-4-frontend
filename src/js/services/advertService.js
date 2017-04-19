angular
  .module('yabee')
  .service('advertService', advertService);

// advertService.$inject = [];
function advertService() {
  const vm = this;
  vm.currentAdvert =  {} ;
}
