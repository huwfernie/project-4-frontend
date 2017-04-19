angular
  .module('yabee')
  .controller('authCtrl', authCtrl);

authCtrl.$inject = ['$auth', '$state'];
function authCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function register() {
    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }

  vm.register = register;

  function login() {
    $auth.login(vm.credentials)
      .then(() => $state.go('home'));
  }

  vm.login = login;
}
