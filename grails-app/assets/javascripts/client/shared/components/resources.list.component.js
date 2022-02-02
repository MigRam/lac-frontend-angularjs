//= wrapped

angular.module("client.shared").component("resourcesList", {
  bindings: {
    resourceData: "<"
  },
  templateUrl: "/client/shared/resources-list.html",
  controller: ResourceListController,
  controllerAs: "cm"
});

ResourceListController.$inject = [];

function ResourceListController() {
  var cm = this;
}
