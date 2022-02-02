//= wrapped

angular
  .module("client.shared")
  .component("searchbar", {
    bindings: {
      data: "=?data",
      total: "=?total",
      facetData: '=?facetData',
      noResults: '=?noResults',
      noResultsMsg: '=?noResultsMsg',
      selectedFacet: '=?selectedFacet'
    },
    templateUrl: "/client/shared/searchbar.html",
    require: {},
    controller: SearchbarCtrl,
    controllerAs: "vm"
  });

SearchbarCtrl.$inject = [ "utilsService", "odataQueryService", "leafletService", "$log", "$timeout", "$q"];

function SearchbarCtrl(utilsService, odataQueryService, leafletService, $log, $timeout) {
  var vm = this;
  var requestFacets = ["ObjectLanguage:250,Country:250,Keywords:250,MetadataType,ResourceMimeType:250,Region:250"].join("");

  vm.readonly = false;
  vm.autocompleteRequireMatch = true;
  vm.selectedKeys = [];

  vm.searchTextChange = searchTextChange;
  vm.selectedHintChange = selectedHintChange;
  vm.doSearch = doSearch;
  vm.requestSuccessfull = requestSuccessfull;
  vm.requestFailed = requestFailed;
  vm.setUrlParam = setUrlParam;
  vm.transformChip = transformChip;
  
  function searchTextChange(query) {
    var $input = {};
    $input.keyword = query;
    vm.selectedFacet = null;
    // $log.info('selected text change: ', $input);
    if (typeof $input.keyword === 'undefined') {
    } else {
      var promise = odataQueryService.search($input.keyword, requestFacets).then(requestSuccessfull).catch(requestFailed);
      return promise;
    }
  }

  function selectedHintChange(key, count) {
    var $input = {};
    $input.keyword = key;
    $input.value = count;
   // $log.info('selected hint change: ', $input);
    if (typeof $input.keyword === 'undefined') {
    } else {
      var promise = odataQueryService.queryContainsCount($input.keyword, $input.value, requestFacets).then(requestSuccessfull).catch(requestFailed);
      return promise;
    }
  }

  function doSearch(query) {
    // $log.info('do search: ', query);
    vm.selectedFacet = null;
    var promise = odataQueryService.search(query, requestFacets).then(
      function (response) {
        return response["@a5.autocomplete"]["autocomplete"]["buckets"];
      }
    ).catch(requestFailed);
    return promise;
  }

  function requestSuccessfull(response) {
    // $log.info('GET: ', response);
    if (response["value"].length == 0) {
      return null;
    } else {
      vm.data = response !== undefined ? response["value"] : null;
      // vm.total = response["@odata.count"];
      vm.total = response["value"]['length'];
      vm.facetData = response["@a5.facets"];
      leafletService.queryMap("discovery-map", response["value"]);
      setUrlParam(response['@a5.selector']['$search']);
      vm.urlParam = utilsService.getSearchParam();
      vm.showFacetNav = true;
    }
  }

  function requestFailed(error) {
    $log.error('Error GET: ', error);
  }

  function setUrlParam(query) {
    $timeout(function () {
      utilsService.setSearchParam(query);
    }, 100);
  }

  function transformChip(chip) {
    if (angular.isObject(chip)) {
      return chip;
    }

    // Otherwise, create a new one
    return {
      name: chip,
      type: 'new'
    }
  }


  vm.$onInit = initComponent();

  function initComponent() {
   // vm.urlParam = utilsService.getSearchParam();
  }
}