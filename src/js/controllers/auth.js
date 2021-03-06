angular
  .module('yabee')
  .controller('authCtrl', authCtrl);

authCtrl.$inject = ['$auth', '$state', 'userService'];
function authCtrl($auth, $state, userService) {
  const vm = this;
  vm.credentials = {};

  function register() {
    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }
  vm.register = register;


  function login() {
    $auth.login(vm.credentials)
      .then((response) => {
        userService.currentUser = response.data.user;
        // console.log('auth');
        // console.log(response.data);
        $state.go('profile');
      });
  }
  vm.login = login;
}
