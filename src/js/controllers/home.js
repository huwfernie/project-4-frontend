angular
  .module('yabee')
  .controller('homeCtrl', homeCtrl);


// this returns all the Offers to display them on the homepage
homeCtrl.$inject = ['Offer', 'userService', '$state', '$rootScope'];
function homeCtrl(Offer, userService, $state, $rootScope) {
  const vm = this;
  vm.offers = Offer.query();


  vm.offersNew = offersNew;
  function offersNew() {
    if(userService.currentUser.id) {
      $state.go('offersNew');
    } else {
      console.log('broadcast');
      const err = new Error('unauthorized');
      err.status = 401;
      err.data = { message: 'you must login if you want to write your own advert' };
      $rootScope.$broadcast('error', err);
      $state.go('login');
    }
  }

}
