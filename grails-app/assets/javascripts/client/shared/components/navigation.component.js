//=wrapped

angular
    .module("client.shared")
    .component("navigation", {
        templateUrl: "/client/shared/navigation.html",
        controller: NavigationController,
        controllerAs: "vm"
    });

NavigationController.$inject = [ 'contextPath', '$log', '$localStorage', 'authService' ];

function NavigationController( contextPath, $log, $localStorage, authService ) {
    var vm = this;

    vm.contextPath = contextPath;

    vm.toggleMobileNav = function () {
        var $navbarBurgers = Array.prototype.slice.call(
            document.querySelectorAll(".navbar-burger"),
            0
        );

        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach(function (element) {
                element.addEventListener("click", function () {
                    var target = element.dataset.target;
                    var $target = document.getElementById(target);

                    element.classList.toggle("is-active");
                    $target.classList.toggle("is-active");
                });
            });
        }
    };

    vm.isAuthenticated = function () {

        if ($localStorage['currentUser'] !== undefined) {

            $log.info('Current User: ', $localStorage['currentUser']);

            vm.user = '@' + $localStorage['currentUser']['family_name'];

            vm.ifLoggedIn = true;


        } else {

            vm.ifLoggedIn = false;

        }
    };

    vm.logout = function () {
        return authService.logout();

    };

    vm.$onInit = initComponent();

    function initComponent() {
        authService.isAuthenticated();
        vm.toggleMobileNav();
        vm.isAuthenticated();
    }
}
