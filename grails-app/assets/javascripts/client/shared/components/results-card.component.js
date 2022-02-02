//= wrapped

angular
.module("client.shared")
.component("resultsCard", {
  bindings: {
    data: '<?data',
    total: "<?total"
  },
  templateUrl: "/client/shared/results-card.html",
  controller: CardCtrl,
  controllerAs: "vm"
});

CardCtrl.$inject = ['utilsService'];

function CardCtrl( utilsService ) {

  var vm = this;

  vm.itemsPerPage = 10;

  vm.viewData = viewData;

  function viewData(type, id) {
    utilsService.goToView(type.toString().toLowerCase(), id);
  }


 vm.$onInit = initComponent();
 
 function initComponent() {
  
 }

}