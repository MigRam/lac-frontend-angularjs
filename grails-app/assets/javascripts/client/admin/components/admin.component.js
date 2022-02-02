angular
  .module("client.admin")
  .component("admin", {
    templateUrl: "/client/admin/admin.html",
    controller: AdminCtrl,
    controllerAs: "vm"
  });
  
  AdminCtrl.$inject = [];
  
  function AdminCtrl() {}
  