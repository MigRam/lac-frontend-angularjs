//= wrapped

angular
  .module("client.discovery")
  .component("resource", {
    templateUrl: "/client/discovery/resource.html",
    controller: ResourceCtrl,
    controllerAs: "vm"
  });

/** */
/** Resource View */
ResourceCtrl.$inject = ["$stateParams", "odataObjectService", "utilsService", "dataService"];
function ResourceCtrl($stateParams, odataObjectService, utilsService, dataService) {
  var vm = this;

  vm.resourceId = "hdl:" + $stateParams.id;

  vm.requestResourceViewDataById = function requestResourceViewDataById(id) {
    var fetchResourceData = odataObjectService.fetchObject(id).then(function (response) {
      vm.resourceContent = response;
    });

    fetchResource(id);

    return {
      fetchResourceData: fetchResourceData
    }
  };

  function fetchResource(id) {
    vm.src = utilsService.fetchFile(id);
  }

  vm.downloadFile = function (id) {
    return utilsService.download(id);
  };

  vm.getParentData = function () {
    vm.fileIsPartOf = dataService.getData();
  };

  vm.goToParent = function (type, id) {
    utilsService.goToView(type, id);
  };

  vm.$onInit = initComponent();
  function initComponent() {
    vm.requestResourceViewDataById(vm.resourceId);
    vm.getParentData();

  }
}
