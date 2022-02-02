angular.module("client.shared").component("itemCard", {
    bindings: {
        resultsData: "<",
        total: "<",
        collectionData: "<?collectionData"
    },
    templateUrl: "/client/shared/item-card.html",
    controller:ItemCardCtrl,
    controllerAs: "cm"
});

ItemCardCtrl.$inject = ['utilsService'];

function ItemCardCtrl(utilsService) {

    var cm = this;

    cm.viewCollection = viewCollection;

    function viewCollection(type, id) {
        utilsService.goToView(type.toString().toLowerCase(), id);
    }
}
