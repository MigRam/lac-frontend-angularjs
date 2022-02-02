angular.module("client.guides").component("guidesNav", {
  templateUrl: "/client/guides/guides-nav.html",
  controller: GuidesNavController,
  controllerAs: "cm"
});

GuidesNavController.$inject = [];

function GuidesNavController() {}
