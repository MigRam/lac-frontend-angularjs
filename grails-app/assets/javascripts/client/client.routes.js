//= wrapped

angular
    .module("client.routes", ["client"])
    .constant("contextPath", window.contextPath)
    .run(function ($anchorScroll, $window) {
        var scrollToTop = function (method) {
            var orig = $window.window.history[method];
            $window.window.history[method] = function () {
                var retrieveValues = orig.apply(
                    this,
                    Array.prototype.slice.call(arguments)
                );
                $anchorScroll();
                return retrieveValues;
            };
        };
        scrollToTop("pushState");
        scrollToTop("replaceState");
    })
    .service("AuthInterceptor", [
        "$q",
        "$log",
        "$rootScope",
        function ($q, $log, $rootScope) {
            return {
                request: function (config) {
                    // $log.info('Log every request maded: ', config);

                    return config;
                },
                requestError: function (rejection) {
                    return $q.reject(rejection);
                },
                response: function (response) {
                    // $log.info('Log every response: ', response);
                    return response;
                },
                responseError: function (rejection) {
                    var authNotification =
                        "client status: " +
                        rejection.status +
                        " | Access: " +
                        rejection.statusText;

                    switch (rejection.status) {
                        case 200:
                            /**  $log.log(authNotification); */
                            break;
                        case 401:
                            $log.error("Server 401: ", authNotification);
                            break;
                        case 403:
                            $log.warn("Server 403: ", authNotification);
                            break;
                        case 404:
                            return $q(function () {
                                return null;
                            });
                        case 500:
                            $log.error("Server 500: ", authNotification);
                            break;
                    }

                    return $q.reject(rejection);
                }
            };
        }
    ])
    .config(config);

config.$inject = [
    "$stateProvider",
    "$urlRouterProvider",
    "$httpProvider",
    "$compileProvider",
    "$logProvider",
    "$locationProvider",
    "$urlMatcherFactoryProvider",
    "$sceDelegateProvider"
];

function config(
    $stateProvider,
    $urlRouterProvider,
    $httpProvider,
    $compileProvider,
    $logProvider,
    $locationProvider,
    $urlMatcherFactoryProvider,
    $sceDelegateProvider
) {
    /** enhance angularjs performance */
    $compileProvider.debugInfoEnabled(false);

    /** angular 124:278 - disable debug logs from angularjs on leaflet directive */
    $logProvider.debugEnabled(false);

    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

    /** enable CORS */
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    // Set the Content-Type
    $httpProvider.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    /** headers Reset headers to avoid OPTIONS request (aka preflight)
     $httpProvider.defaults.headers.common = {};
     $httpProvider.defaults.headers.post = {};
     $httpProvider.defaults.headers.put = {};
     $httpProvider.defaults.headers.patch = {};

     $httpProvider.defaults.withCredentials = true;
     $httpProvider.defaults.headers.common['X-CSRF-Token'] = $cookies['csrftoken'];
     */

    /** enable POST */
    // $httpProvider.defaults.headers.post["Content-Type"] = "text/plain";

    /** delegate provider for odata apis */
    $sceDelegateProvider.resourceUrlWhitelist([
        "self",
        "https://grails-dev.rrz.uni-koeln.de/ka3-a5-core/api/**/*"
    ]);

    /** interceptor */
    $httpProvider.interceptors.push("AuthInterceptor");

    /** Issue: slash encode stateparams %2F */
    $urlMatcherFactoryProvider.type("SlashFix", {
        raw: true
    });

    /** hashbang html5 mode */
    $locationProvider.hashPrefix("");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true,
        rewriteLinks: false
    });

    /** SPA Routing */
    $stateProvider
        .state("index", {
            url: "/",
            component: "discovery"
        })
        .state("bundle", {
            url: "/bundle/{id:SlashFix}",
            component: "bundle"
        })
        .state("collection", {
            url: "/collection/{id:SlashFix}",
            component: "collection"
        })
        .state("resource", {
            url: "/resource/{id:SlashFix}",
            component: "resource"
        })
        .state("services", {
            url: "/services",
            component: "analyse"
        })
        .state("login", {
            url: "/login",
            component: "login"
        })
        .state("deposit", {
            url: "/deposit",
            component: "deposit"
        })
        .state("admin", {
            url: "/admin",
            component: "admin"
        })
        .state("user", {
            url: "/user",
            component: "user"
        })
        .state("elanplayer", {
            url: "/elan-player",
            component: "elanplayer"
        })
        .state("impressum", {
            url: "/impressum",
            templateUrl: "/client/shared/impressum.html"
        })
        .state("guides", {
            url: "/docs/user-guide.html",
            templateUrl: "/client/guides/user-guide.html"
        })
        .state("terms-of-use", {
            url: "/docs/terms-of-use.html",
            templateUrl: "/client/guides/terms-of-use.html"
        })
        .state("mission-statement", {
            url: "/docs/mission-statement.html",
            templateUrl: "/client/guides/mission-statement.html"
        })
        .state("depositor-agreement", {
            url: "/docs/depositor-agreement.html",
            templateUrl: "/client/guides/depositor-agreement-english.html"
        })
        .state("depositor-agreement-german", {
            url: "/docs/depositor-agreement-german.html",
            templateUrl: "/client/guides/depositor-agreement-german.html"
        })
        .state("data-user-agreement", {
            url: "/docs/data-user-agreement.html",
            templateUrl: "/client/guides/data-user-agreement.html"
        })
        .state("depositor-guidelines", {
            url: "/docs/depositor-guidelines.html",
            templateUrl: "/client/guides/depositor-guidelines.html"
        })
        .state("submission-guidelines", {
            url: "/docs/submission-guidelines.html",
            templateUrl: "/client/guides/submission-guidelines.html"
        })
        .state("depositing-policy", {
            url: "/docs/depositing-policy.html",
            templateUrl: "/client/guides/depositing-policy.html"
        })
        .state("format-whitelist", {
            url: "/docs/format-whitelist.html",
            templateUrl: "/client/guides/format-whitelist.html"
        })
        .state("archive-setup", {
            url: "/docs/archive-setup.html",
            templateUrl: "/client/guides/archive-setup.html"
        })
        .state("privacy-policy", {
            url: "/docs/privacy-policy.html",
            templateUrl: "/client/guides/privacy-policy.html"
        });

    $urlRouterProvider.otherwise("/");
}
