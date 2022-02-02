//= wrapped

angular
.module("client.shared")
.factory("dataService", dataService);

dataService.$inject = ["$log", "$localStorage"];

function dataService($log, $localStorage) {
  var svc = this;
  
  function setData(item, item2) {

    $localStorage.data = [item, item2];
  }

  function getData() {
   // $log.info($localStorage.data);
    return $localStorage.data;
  }

  return {
    setData: setData,
    getData: getData
  };
}
