//= wrapped

angular
  .module("client.shared")
  .component("panel", {
    bindings: {
      header: "@?header",
      facetCategory:'@?facetCategory',
      exploreData: "<?exploreData",
      facetData: "=?facetData",
      data: '=?data',
      total: "=?total",
      styles: "@?styles",
      fontstyles: "@?fontstyles",
    },
    templateUrl: "/client/shared/panel.html",
    controller: PanelCtrl,
    controllerAs: "vm"
  });

PanelCtrl.$inject= ["odataQueryService", "leafletService", "utilsService"];

function PanelCtrl(odataQueryService, leafletService, utilsService) {

  var vm = this;
  
  vm.search = function (count, key) {
   
    var count = 250;
    var selectedFacets = [  "ObjectLanguage:"+count+","+"Country:"+count+","+"Keywords:"+count+","+"MetadataType:"+count+","+"ResourceMimeType:"+count+","+"Region:"+count].join("");
   
    return odataQueryService.queryAll(count, key, selectedFacets).then(function (response) {
      
      vm.data = response['value'];
      vm.total = response["@odata.count"];
      vm.facetData = response["@a5.facets"];
      leafletService.queryMap('discovery-map', response["value"]);
      utilsService.setSearchParam(key);
    })
  }


  vm.toggleList = function () {
    vm.list = !vm.list;
  }

  vm.$onInit = initPanelComponent;

  function initPanelComponent() { }
}
