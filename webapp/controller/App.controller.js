sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
  "use strict";

  return Controller.extend("converted.customerregistrationview.controller.App", {
    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     */
    onInit: function () {
      // Log initialization
      console.log("App controller initialized");

      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Check if the router is available
      if (oRouter) {
        console.log("Router found, initializing navigation");

        // Attach event handler for route bypassed event
        oRouter.attachBypassed(function (oEvent) {
          console.log("Route bypassed:", oEvent.getParameter("hash"));
        });

        // Navigate to the main route if no hash is set
        if (!window.location.hash || window.location.hash === "#") {
          console.log("No hash found, navigating to main route");
          // Delay the navigation to ensure the app is fully loaded
          setTimeout(function () {
            oRouter.navTo("main");
          }, 100);
        }
      } else {
        // Log an error if the router is not found
        console.error("Router not found in App controller");
      }
    }
  });
});
