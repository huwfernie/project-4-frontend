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
    // had to get rid of "!vm.currentUser && " this as it didn't change if two users sign in without refreshing the browser
    if($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
    // if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }
  vm.logout = logout;


  function search() {
    vm.query;

    $state.go('offersSearch', { query: vm.query }); // Mike Fixed this!
  }
  vm.search = search;
}
