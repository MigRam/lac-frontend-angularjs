//= wrapped

angular.module("client.shared").component("geolocationInfo", {
  bindings: {
    geolocationData: "<"
  },
  templateUrl: "/client/shared/geolocation-info.html",
  controller: GeolocationInfoController,
  controllerAs: "cm"
});

GeolocationInfoController.$inject = [];

function GeolocationInfoController() {
  var cm = this;
}
