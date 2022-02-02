//= wrapped

angular
    .module("client.shared")
    .service("Api", Api);

Api.$inject = ['urls'];

function Api(urls) {
    var svc = this;

    svc.initService = initService();
  
    function initService() {
        var ENVIRONMENT_STAGING = "/lac3"; // ** "lac3": IMDI Bestand für Frontendentwicklung (@Jörg/@Miguel: früher "lac") **
        var ENVIRONMENT_DEV = "/lac2"; // ** "lac2": CMDI/BLAM Bestand der Datenmigration **
        var ENVIRONMENT_PROD = "/lac"; // ** "lac": Mini-Testdatenbestand für CLARIN Zertifizierung, der auch auf grails-prod erscheinen wird **
    
        svc.QUERYAPI = urls.SERVER_DEV + "query" + ENVIRONMENT_DEV;
        svc.OBJECTAPI = urls.SERVER_DEV + "object" + ENVIRONMENT_DEV;
        svc.MEDIAPI = urls.SERVER_DEV + "media" + ENVIRONMENT_DEV;
        svc.ANNOTATIONAPI = urls.SERVER_DEV + "/annotation" + ENVIRONMENT_DEV;
        svc.ANALYSE = "https://grails-dev.rrz.uni-koeln.de/ka3-analyse/jobOrder";
    }
}
