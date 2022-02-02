//= wrapped

angular
    .module("client.discovery")
    .component("collection", {
        templateUrl: "/client/discovery/collection.html",
        controller: CollectionCtrl,
        controllerAs: "vm"
    });

/** */
/** Collection View */
CollectionCtrl.$inject = ["$stateParams", "odataQueryService", "leafletService", "odataObjectService", "utilsService"];
function CollectionCtrl($stateParams, odataQueryService, leafletService, odataObjectService, utilsService) {
    var vm = this;

    vm.collectionId = "hdl:" + $stateParams.id;

    vm.requestCollectionViewDataById = function (id) {
        return odataQueryService
            .filter("id ", " eq ", id)
            .then(function (response) {

                leafletService.generateSingleMarker("mini-map", response["value"]);

                if (response["value"] !== undefined || response["value"] !== "") {
                    vm.collectionContent = response["value"];
                    vm.displayJSONLD(vm.collectionContent);
                }
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

       var collectionJSON = utilsService.generateJSONLD(data, originUrl, originHost);

        angular.element(document).ready(function() {
            var jsonLd = angular.element(document.querySelector('#jsoncollection'))[0];
            jsonLd.innerHTML = collectionJSON;
            // utilsService.l('info', jsonLd);
            // utilsService.l('info', collectionJSON);
        });

    };

    vm.$onInit = initComponent();

    function initComponent() {
        vm.requestCollectionViewDataById(vm.collectionId);
        vm.requestMediafiles(vm.collectionId);
    }
}