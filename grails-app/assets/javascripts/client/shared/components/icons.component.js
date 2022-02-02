//= wrapped

angular.module("client.shared").component("iconList", {
  bindings: {
    iconData: "<"
  },
  templateUrl: "/client/shared/icons.html",
  controller: IconsController,
  controllerAs: "cm"
});

IconsController.$inject = [];

function IconsController() {
  var cm = this;
}
