//= wrapped

angular
    .module("client.shared")
    .factory("odataQueryService", odataQueryService);

odataQueryService.$inject = ["Api", "odataService", "$log", "rx"];

function odataQueryService(Api, odataService, $log, rx) {
    function success(response) {
        // $log.info(response);
        return response;
    }

    function failed(err) {
        $log.error("API ERROR:: ", err);
    }

    function search(term, setFacetsSelector) {
        return odataService
            .odataPromise(Api.QUERYAPI, {
                $search: term,
                autocomplete: true,
                $count: true,
                $top: 1000,
                highlight: true,
                pretty: true,
                facets: setFacetsSelector || ""
            })
            .odata()
            .$promise.then(success)
            .catch(failed);
    }

    function queryFacets(setFacetsSelector) {
        return odataService
            .odataPromise(Api.QUERYAPI, {
                facets: setFacetsSelector,
                $select: setFacetsSelector
            })
            .odata()
            .$promise.then(success)
            .catch(failed);
    }

    function queryAll(setCountSelector, setSearchSelector, setFacetsSelector) {
        return odataService
            .odataPromise(Api.QUERYAPI, {
                $search: setSearchSelector,
                $top: setCountSelector,
                $count: true,
                highlight: true,
                facets: setFacetsSelector
            })
            .odata()
            .$promise.then(success)
            .catch(failed);
    }

    function filter(field, booleanOperator, term) {
        var filterTerm = [field + booleanOperator + term].join(" ");
        return odataService
            .odataPromise(Api.QUERYAPI, { $filter: filterTerm })
            .odata()
            .$promise.then(success)
            .catch(failed);
    }

    function queryAndFilter( setSearchSelector, setField, setBooleanOperator, setTerm, setCount) {
        return odataService
            .odataPromise(Api.QUERYAPI, {
                $search: setSearchSelector,
                $filter: setField +  " " + setBooleanOperator + " " + '"' + setTerm + '"',
                $top: setCount,
                $count: true,
                highlight: true,
                pretty: true,
                autocomplete: true,
            })
            .odata()
            .$promise.then(success)
            .catch(failed);
    }

    function queryContainsCount(setSearchSelector, setCountSelector, setFacetsSelector) {
        return odataService
            .odataPromise(Api.QUERYAPI, {
                $search: setSearchSelector,
                $top: setCountSelector,
                $count: true,
                highlight: true,
                facets: setFacetsSelector || ""
            })
            .odata()
            .$promise.then(success)
            .catch(failed);
    }

    return {
        search: search,
        queryFacets: queryFacets,
        queryAll: queryAll,
        filter: filter,
        queryAndFilter: queryAndFilter,
        queryContainsCount: queryContainsCount
    };
}
