//= wrapped

angular
    .module("client.shared")
    .factory("_", _);

_.$inject = [ '$window' ];

function _( $window ) {
    return $window._;
}