//=wrapped

angular
    .module("client.shared")
    .component("facetNav", {
        bindings: {
            facetCategory: "@?facetCategory",
            facetHeader: "@?facetHeader",
            facetData: "=?facetData",
            data: "=?data",
            total: "=?total",
            noResults: "=?noResults",
            noResultsMsg: "=?noResultsMsg",
            url: "=?url",
            selectedFacet: "=?selectedFacet"
        },
        templateUrl: "/client/shared/facets-nav.html",
        controller: FacetNavCtrl,
        controllerAs: "vm"
    });

FacetNavCtrl.$inject = [ "$location", "$log", "odataQueryService", "utilsService", "leafletService"];

function FacetNavCtrl( $location, $log, odataQueryService, utilsService, leafletService ) {
    var vm = this;
    /** properties */
    vm.urlParam = utilsService.getSearchParam();
    vm.selection = new Object();

    /** methods */
    vm.toggleFacetCard = toggleFacetCard;
    vm.toggleList = toggleList;
    vm.selectFacet = selectFacet;
    vm.filterFacet = filterFacet;

    
    function toggleList() {
        vm.facetlist = !vm.facetlist;
    };
    
    function toggleFacetCard() {
        vm.facetCard = !vm.facetCard;
    };

    function selectFacet(category, selectFacet, index) {
        vm.selection.category = category;
        vm.selection.key = selectFacet.key;
        vm.selection.count = selectFacet.doc_count;
        vm.selection.index = index;

        filterFacet(vm.selection);
    }

    function filterFacet(facet) {
        if(utilsService.getSearchParam() === undefined) {
            $log.info('faceted search without url param', facet);

                switch(facet.key) {
                    case "application/pdf":
                        facet.key = 'pdf';
                        break;
                    case  "audio/x-wav":
                        facet.key = 'audio';
                        break;
                    case  "text/x-eaf+xml":
                        facet.key = 'text';
                        break;
                    case  "video/mp4":
                        facet.key = 'video';
                        break;
                    case "text/plain":
                        facet.key = 'text'; 
                        break;
                    default:
                    break;
                }
            return odataQueryService.queryContainsCount(facet.key, facet.count).then(function(response) {
                if(response['value'].length == 0) {
                    vm.noResults = true;
                    utilsService.clearUrl();
                    $log.error(response['@a5.selector'], response['value']);
                } else {
                    $log.info(response['@a5.selector'], response['value']);
                    vm.noResults = false;
                    vm.data = response['value'];
                    vm.total = response['@odata.count'];
                    vm.selectedFacet = facet;
                    leafletService.queryMap("discovery-map", response['value']);
                    // utilsService.setSearchParam(response['@a5.selector']['$search']);
                }
            })

        } else {
            $log.info('faceted Search with Url Param', utilsService.getSearchParam());
            return odataQueryService.queryAndFilter(utilsService.getSearchParam(), facet.category, 'eq', facet.key, facet.count).then(
                function(response) {
                if(response['value'].length == 0) {
                    vm.noResults = true;
                   // utilsService.clearUrl();
                   $log.error(response['@a5.selector'], response['value']);
                } else {
                    $log.info(response['@a5.selector'], response['value']);
                    vm.noResults = false;
                    vm.data = response['value'];
                    vm.total = response['@odata.count'];
                    vm.selectedFacet = facet;
                    leafletService.queryMap("discovery-map", response['value']);
                   // utilsService.setSearchParam(response['@a5.selector']['$search'] + '_AND_' + facet.category + ':' + facet.key);
                }
            })
        }
    }


    function initFacetListComponent() {
        // $log.info('Search url param: ', urlParam);
    }

    vm.$onInit = initFacetListComponent();
}
