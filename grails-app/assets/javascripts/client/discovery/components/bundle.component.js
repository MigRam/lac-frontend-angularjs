//= wrapped

angular
  .module("client.discovery")
  .component("bundle", {
    templateUrl: "/client/discovery/bundle.html",
    controller: BundleCtrl,
    controllerAs: "vm"
  });

/** */
/** Bundle View */
BundleCtrl.$inject = ["$stateParams", "odataQueryService", "leafletService", "odataObjectService", "dataService", "utilsService"];
function BundleCtrl($stateParams, odataQueryService, leafletService, odataObjectService, dataService, utilsService) {
  var vm = this;

  vm.bundleId = "hdl:" + $stateParams.id;

  vm.requestBundleViewDataById = function (id) {
    return odataQueryService
      .filter("id ", " eq ", id)
      .then(function (response) {

        leafletService.generateSingleMarker("mini-map", response["value"]);

        if (response["value"] !== undefined || response["value"] !== "") {
          vm.bundleContent = response["value"];
          vm.collectionId = response["value"][0].IsPartOf;
          vm.requestCollectionData(vm.collectionId);
          dataService.setData({ bundle: response["value"][0].Title }, { id: response["value"][0].id });
        //  vm.displayJSONLD(vm.bundleContent);
        }
      });
  };

  vm.requestCollectionData = function (id) {
    return odataQueryService.filter("id ", " eq ", id).then(function (response) {
      vm.collectionContent = response["value"];
    });
  };

  vm.requestMediafiles = function (id) {
    return odataObjectService.fetchObject(id).then(function (response) {
      vm.mediafiles = response["parentOf"];
    });
  };

  vm.displayJSONLD = function(data) {
    // utilsService.l('log', data[0]);

    var originUrl = utilsService.getUrl('url');
    var originHost = utilsService.getUrl('host');

    var bundleJSON = utilsService.generateJSONLD(data, originUrl, originHost);

    angular.element(document).ready(function() {
      var jsonLd = angular.element(document.querySelector('#jsonbundle'))[0];
      jsonLd.innerHTML = bundleJSON;
      // utilsService.l('info', jsonLd);
      // utilsService.l('info', bundleJSON);
    });

  };
  vm.$onInit = initComponent();

  function initComponent() {
    vm.requestBundleViewDataById(vm.bundleId);
    vm.requestMediafiles(vm.bundleId);
  }
}