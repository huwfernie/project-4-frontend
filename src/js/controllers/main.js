angular
  .module('yabee')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['User', '$rootScope', '$state', '$auth'];
function MainCtrl(User, $rootScope, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });


  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message;
    if(err.status === 401) $state.go('login');
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(!vm.currentUser && $auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
  });


  const protectedStates = ['offersNew', 'advertsNew'];

  $rootScope.$on('$stateChangeStart', (e, toState) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(toState.name))) {
      vm.stateHasChanged = false;
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to access this page.';
    }
  });

  function logout() {
    vm.currentUser = null;
    $auth.logout();
    $state.go('login');
  }
  vm.logout = logout;

  function searchOffers() {
    // vm.query;
    $state.go('offersSearch', { query: vm.query }); // Mike Fixed this!
  }
  vm.searchOffers = searchOffers;

  function searchAdverts() {
    // vm.query;
    $state.go('advertsSearch', { query: vm.query }); // Mike Fixed this!
  }
  vm.searchAdverts = searchAdverts;
}
