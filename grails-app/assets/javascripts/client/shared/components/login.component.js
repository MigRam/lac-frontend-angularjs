angular
    .module("client.shared")
    .component("login", {
        templateUrl: "/client/shared/login.html",
        controller: LoginCtrl,
        controllerAs: "vm"
    });
    
LoginCtrl.$inject = [ "contextPath", "$log", "authService", "$window" ];

function LoginCtrl( contextPath, $log, authService, $window) {

    var vm = this;

    vm.contextPath = contextPath;

    vm.login = function() {
        authService.login();
    };
   
    vm.loginProvider = function(path) {
        $window.open(path, "_self", "");
    };


    vm.$onInit = initServiceComponent();

    function initServiceComponent() {
        authService.handleAuthentication();
        authService.isAuthenticated();
    }
}