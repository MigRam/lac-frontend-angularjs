angular.module("client.services").component("analyse", {
  templateUrl: "/client/services/analyse.html",
  controller: analyseCtrl,
  controllerAs: "vm"
});

analyseCtrl.$inject = ["contextPath", "$log", "$http", "Api", "$localStorage", "$window"];

function analyseCtrl(contextPath, $log, $http, Api, $localStorage, $window) {
  var vm = this;

  vm.contextPath = contextPath;

  vm.formData = {};

  vm.getAllAudioFiles = function() {
    $http.get(Api.QUERYAPI + "?$search=*&drill=(ResourceMimeType eq 'audio/x-wav')&$skip=0&$top=50&pretty&$count")
      .then(function(response) {
        $log.log(response);
        vm.values = response.data.value;
      })
      .catch(function(err) {
        $log.error(err);
      });
  };

  vm.sentComputeJob = function() {
    $http
      .post(Api.ANALYSE, {
        params: {
          config: {
            data: vm.formData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }
        }
      })
      .then(function(response) {
        $log.info("Service payload::", response);
      })
      .catch(function(err) {
        $log.error(err);
      });
  };

  vm.getJobOrder = function(id) {
      return $window.open('https://grails-dev.rrz.uni-koeln.de/ka3-analyse/result/show/' + id, '_blank');
  };

  vm.getAllJobsOrders = function() {
    return $http
      .get("https://grails-dev.rrz.uni-koeln.de/ka3-analyse/jobOrder?max=1000000000", {
        params: {
          config: {
            headers: { "application": "application/json" }
          }
        }
      })
      .then(function(response) {
        $log.log(response);
        vm.orders = response.data;
      })
      .catch(function(err) {
        $log.error(err);
      });
  };

  vm.submitForm = function() {
    var form = angular.element('#AnalyseForm');
    form.submit();
  }

  vm.$onInit = initAnalyseComponent();
  function initAnalyseComponent() {
    // vm.getAllAudioFiles();
    vm.getAllJobsOrders();
    vm.currentUser = $localStorage.currentUser;
  }
}
