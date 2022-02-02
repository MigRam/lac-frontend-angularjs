//= wrapped

angular.module("client.discovery").component("discovery", {
  bindings: {
    noResults: '=?noResults',
    noResultsMsg: '=?noResultsMsg',
    showFacetNav: '=?showFacetNav'
  },
  templateUrl: "/client/discovery/index.html",
  controller: DiscoveryCtrl,
  controllerAs: "vm"
});

/** Index View */
DiscoveryCtrl.$inject = ["odataQueryService", "leafletService", "utilsService", "$log", "$mdSidenav"];
function DiscoveryCtrl( odataQueryService, leafletService, utilsService, $log, $mdSidenav ) {
  var vm = this;

  vm.explorePanelHint = "Explore:: Browse the archive by category (showing top 5)";

  vm.initExplorePanel = function(count) {
    
    vm.isPanelBoxActive = true;

    var selectedFacets = [ "ObjectLanguage:" + count + "," + "Country:" + count + "," + "Keywords:" + count].join("");

    return odataQueryService
      .queryFacets(selectedFacets)
      .then(function(response) {
        if (response !== undefined ? response["@a5.facets"] : null) {
          vm.exploreData = response["@a5.facets"];
          // $mdSidenav('left').toggle();
        }
      });
  };

  vm.initDiscoveryMap = function(count) {
    return odataQueryService.queryAll(count).then(function(response) {
      var geoData = response["value"];
      leafletService.generateMarkerCluster(geoData);
    });
  };

  vm.startFacetsPanel = function() {
    var count = 250;
    var selectedFacets = [  "ObjectLanguage:"+count+","+"Country:"+count+","+"Keywords:"+count+","+"MetadataType:"+count+","+"ResourceMimeType:"+count+","+"Region:"+count].join("");
    
    return odataQueryService.queryAll(count, '*', selectedFacets).then(function (response) {
    
      vm.facetData = response["@a5.facets"];
     // $log.log(vm.facetData);
             
    });
  }

  vm.reset = function() {
    var count = 250;
    var selectedFacets = [  "ObjectLanguage:"+count+","+"Country:"+count+","+"Keywords:"+count+","+"MetadataType:"+count+","+"ResourceMimeType:"+count+","+"Region:"+count].join("");
    
    return odataQueryService.queryAll(count, '*', selectedFacets).then(function (response) {
      
      vm.isPanelBoxActive = false;
      vm.noResults = false;
      vm.data = response["value"];
      vm.total = response["@odata.count"];
      vm.facetData = response["@a5.facets"];
     
      utilsService.clearUrl();
      leafletService.queryMap("discovery-map", response["value"]);
      vm.selectedFacet = null;
      vm.urlParam = null;
    
    });
  };

  vm.queryUrl = function() {
    var url = utilsService.getSearchParam();
    if (url !== undefined) {
      
      var searchedFacets = [  "ObjectLanguage,Country,Keywords,MetadataType,ResourceMimeType,Region"].join("");

      return odataQueryService
        .search(url, searchedFacets)
        .then(function(response) {
          if (response["value"] < 1 || response["value"] == 0) {
            $log.error("NO results found");
            vm.noResultsFound = "NO results found for: " + vm.searchTerm;
            utilsService.clearUrl();
          } else {
            vm.data = response !== undefined ? response["value"] : null;
            vm.hints = response["@a5.autocomplete"].autocomplete.buckets;
            vm.total = response["@odata.count"];
            vm.facetData = response["@a5.facets"];
            
            leafletService.queryMap("discovery-map", response["value"]);
            // vm.requestAllFacetsData();
          }
        });
    }
  };
  vm.toggleLeft = buildToggler('left');
  vm.buildToggler = buildToggler;
  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  vm.initComponent = function() {
    leafletService.initMap("discovery-map");
    vm.initDiscoveryMap(1000);
    vm.initExplorePanel(250);
    vm.queryUrl();
    vm.startFacetsPanel();
    //  $mdSidenav('left').toggle();    
  };

  vm.$onInit = vm.initComponent();
}
