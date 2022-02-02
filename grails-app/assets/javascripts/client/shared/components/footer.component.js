angular
.module("client.shared")
.component("clientFooter", {
  templateUrl: "/client/shared/footer.html",
  controller: FooterController,
  controllerAs: "cm"
});

FooterController.$inject = [];

function FooterController() {}
