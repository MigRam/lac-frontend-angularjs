angular
    .module("client.shared")
    .service("utilsService", utilsService);

utilsService.$inject = [
    "Api",
    "$state",
    "$location",
    "$sce",
    "$window",
    "$log",
    "_"
];

function utilsService(Api, $state, $location, $sce, $window, $log, _) {

    function getSearchParam() {
        return $location.search()['s'];
    }

    function setSearchParam(key) {
        
        // var formatedStr = new String(key).replace(/%20/g, "+");
        // var formatedStr = formatString(key, ''); ES6 Error grails
        
        //: todo refactor url string format pretty

        return $location.search({
            's': key
        });
    }
/*
    function formatString(fmt, args){
        return fmt
            .split("%20")
            .reduce((aggregate, chunk, i) =>
                aggregate + chunk + (args[i] || ""), "");
    }
*/  

    function getUrl(type) {
        switch (type) {
            case "url":
                return $location.absUrl();
            case "host":
                return $location.host();
            case "port":
                return $location.port();
            case "path":
                return $location.path();
            case "search":
                return $location.search();
            default:
                break;
        }
    }

    function clearUrl() {
        return $location.search({ s: null, hit: null });
    }

    function locationUrlSearch(searchKey, view) {
        switch (view) {
            case "index":
                return $location.search({ s: searchKey });
            case "bundle":
                break;
            case "collection":
                break;
            case "resource":
                break;
            default:
                break;
        }
    }

    function goToView(view, id) {
        var viewId = id.toString().replace("hdl:", "");
        return $state.go(view, {
            id: viewId
        });
    }

    function collapseList(list) {
        list = !list;
    }

    function fetchFile(id) {
        return $sce.trustAsResourceUrl( Api.MEDIAPI + "/" + id);
        // return $window.open(Api.MEDIAPI + "/" + id, "_blank", "");
    }

    function download(id) {
        var downloadPath = Api.MEDIAPI + "/" + id;
        $window.open(downloadPath, "_blank", "");
    }

    function browserHistoryBack() {
        return $window.history.back();
    }

    function l(type, msg) {
        switch (type) {
            case "info":
                return $log.info(msg);
            case "log":
                return $log.log(msg);
            case "warn":
                return $log.warn(msg);
            case "error":
                return $log.error(msg);
            default:
                return $log.info(msg);
        }
    }

    function generateJSONLD(data, originUrl, originHost) {

        var handelUrl = new String(data[0]['id']).substring(4);
        // l('info', handelUrl);

        var schemaOrg = angular.toJson({
            "@context": "https://schema.org/",
            "@type": "Dataset",
            "@id": "https://hdl.handle.net/" + handelUrl,
            "name": data[0]['Title'],
            "description": data[0]['Description'],
            "url": originUrl,
            "publisher": {
                "@type": "Organization",
                "name": "Language Archive Cologne",
                "@id": originHost
            },
            "license": "https://creativecommons.org/licenses/by-sa/4.0",
            "datePublished": "",
            "creator": [
                {
                    "@type": "Person",
                    "givenName": "",
                    "familyName": "",
                    "name": "",
                    "affiliation": "",
                    "identifier": {
                        "@type": "",
                        "propertyID": "",
                        "value": ""
                    }
                },
                {
                    "@type": "Person",
                    "givenName": "",
                    "familyName": "",
                    "name": "",
                    "affiliation": "",
                    "identifier": {
                        "@type": "",
                        "propertyID": "",
                        "value": ""
                    }
                }
            ],
            "keywords": [
                data[0]['ObjectLanguage'],
                data[0]['Country'],
                data[0]['Region']
            ]
        });

        return schemaOrg;
    }

    return {
        getSearchParam: getSearchParam,
        setSearchParam: setSearchParam,
        getUrl: getUrl,
        clearUrl: clearUrl,
        locationUrlSearch: locationUrlSearch,
        browserHistoryBack: browserHistoryBack,
        goToView: goToView,
        collapseList: collapseList,
        fetchFile: fetchFile,
        download: download,
        l: l,
        generateJSONLD: generateJSONLD
    }


}