angular
    .module("client.shared")
    .service("odataService", odataService);

odataService.$inject = [ "domainServiceFactory" ];

function odataService( domainServiceFactory ) {

    var svc = this;

    svc.odataPromise = odataPromise;
    
    function odataPromise(url, requestParams){
        
       return domainServiceFactory(url, {}, {
            odata: { 
                method: 'GET', 
                params : requestParams, 
                isArray: false,
                cache: true 
            }
        })
    }
    
}