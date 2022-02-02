//= wrapped

angular
  .module("client.deposit")
  .component("deposit", {
    templateUrl: "/client/deposit/deposit.html",
    controller: DepositCtrl,
    controllerAs: "vm"
  });
  
  DepositCtrl.$inject = [];
  
  function DepositCtrl() {

    var vm = this;
    
    vm.$onInit = initComponent();

    function initComponent () {
      
    }
  }
  