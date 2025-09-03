sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device"
], function (UIComponent, Device) {
  "use strict";

  return UIComponent.extend("converted.customerregistrationview.Component", {
    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app.
     * @public
     * @override
     */
    init: function () {
      // Call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // Set device model
      this.setModel(new sap.ui.model.json.JSONModel(Device), "device");

      // Enable routing
      this.getRouter().initialize();
    },

    /**
     * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
     * design mode class should be set, which influences the size appearance of some controls.
     * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
     * @public
     */
    getContentDensityClass: function () {
      if (this._sContentDensityClass === undefined) {
        // Check whether touch is enabled
        if (Device.support.touch) {
          // Apply "Cozy" in case of touch support; default for most sap.m controls
          this._sContentDensityClass = "sapUiSizeCozy";
        } else if (Device.resize.width < 1024) {
          // Apply "Compact" based on window width for smaller screens
          this._sContentDensityClass = "sapUiSizeCompact";
        } else {
          // "Compact" is the standard mode for desktops
          this._sContentDensityClass = "sapUiSizeCompact";
        }
      }
      return this._sContentDensityClass;
    }
  });
});
