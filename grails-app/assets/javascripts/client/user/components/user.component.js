angular
    .module("client.user")
    .component("user", {
        templateUrl: "/client/user/user.html",
        controller: UserCtrl,
        controllerAs: "vm"
    });

UserCtrl.$inject = ["$http", "contextPath", "$log", "$localStorage", "$rootScope", "authService"];

function UserCtrl($http, contextPath, $log, $localStorage, $rootScope, authService) {
    var vm = this;

    vm.contextPath = contextPath;

    var authSucessfully = function (response) {
        $log.info('auth user: ', response);

        vm.authSamlUser = true;
        vm.authenticatedUser = {};
        vm.authenticatedUser.name = response.data.cn;
        vm.authenticatedUser.email = response.data.mail;
        vm.authenticatedUser.id = response.data['PSID'];
        vm.authenticatedUser.institution = response.data['Institution'];
        $localStorage.currentUser = vm.authenticatedUser;
    };

    var authFailed = function(error) {
        $log.error('Auth failed', error);
    };

    vm.getCurrentSAMLUser = function () {
        return $http
            .get(vm.contextPath + '/samlInfo/asJSON')
            .then(authSucessfully)
            .catch(authFailed);
    };

    vm.$onInit = initComponent();

    function initComponent() {
        authService.handleAuthentication();
        $log.info($localStorage.currentUser);
        if($localStorage.currentUser) {
            vm.authenticatedUserName = $localStorage.currentUser['given_name'] + ' ' +  $localStorage.currentUser['family_name']  ;
            vm.authenticatedUserId = $localStorage.currentUser['jti'];
        }
        vm.getCurrentSAMLUser();
    }
}
