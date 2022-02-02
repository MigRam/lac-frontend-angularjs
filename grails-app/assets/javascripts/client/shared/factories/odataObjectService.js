//= wrapped

angular
  .module("client.shared")
  .service("odataObjectService", odataObjectService);

function odataObjectService(Api, odataService, $log) {
  function success(response) {
    // $log.info(response);
    return response;
  }

  function failed(err) {
    $log.error("API ERROR:: ", err);
  }

  function fetchObject(objectId) {
    return odataService
      .odataPromise(Api.OBJECTAPI + "/Object" + "(" + objectId + ")", {
        $expand: "parentOf",
        pretty: true
      })
      .odata()
      .$promise.then(success)
      .catch(failed);
  }

  function fetchObjects(){
    return odataService
      .odataPromise(Api.OBJECTAPI + "/Objects" , {
        pretty: true
      })
      .odata()
      .$promise.then(success)
      .catch(failed);
  }

  return {
    fetchObject: fetchObject,
    fetchObjects: fetchObjects
  };
}
