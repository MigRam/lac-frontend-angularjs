//= wrapped
//= require_self
//= require_tree services
//= require_tree components
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular
    .module("client.services", ["client"])
    .run(['$rootScope', '$state', 'authService', function( $rootScope, $state, authService) {
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                if(error.unAuthorized) {
                    $state.go('login');
                } else if(error.authorized){
                    $state.go('login');
                    }
            })
    }])
