sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/MessagePopover",
  "sap/m/MessageItem",
  "sap/ui/core/library"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary) {
  "use strict";

  // Shortcut for sap.ui.core.MessageType
  var MessageType = coreLibrary.MessageType;

  return Controller.extend("converted.customerregistrationview.controller.CustomerRegistrationView", {
    /**
     * Called when the controller is instantiated.
     */
    onInit: function () {
      // Initialize customer data model
      var oCustomerModel = new JSONModel({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        address: "",
        terms: false
      });
      this.getView().setModel(oCustomerModel);

      // Initialize message model for MessageArea/MessagePopover
      var oMessageModel = new JSONModel({
        messages: [
          {
            type: MessageType.Success,
            title: "System Information",
            description: "Application converted successfully, Use AI optimize for better result",
            subtitle: "Conversion complete",
            counter: 1
          }
        ]
      });
      this.getView().setModel(oMessageModel, "messages");
    },

    /**
     * Handles the submit button press.
     */
    onSubmit: function () {
      // Get the customer data model
      var oCustomerModel = this.getView().getModel();
      var oCustomerData = oCustomerModel.getData();

      // Validate Email
      var emailRegex = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
      if (!emailRegex.test(oCustomerData.email)) {
        MessageBox.error("Invalid Email format");
        return;
      }

      // Check Terms and Conditions
      if (!oCustomerData.terms) {
        MessageBox.error("Please accept Terms and Conditions");
        return;
      }

      // Simulate data persistence logic here (e.g., saving to database)
      // You would typically send this data to a backend service using OData or similar

      // Display success message
      MessageBox.success("Customer registered successfully!");

      // Clear the form after successful submission
      oCustomerModel.setData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        address: "",
        terms: false
      });
    },

    /**
     * Formatter function for the terms and conditions checkbox.
     * @param {boolean} bValue The value of the checkbox.
     * @returns {boolean} The formatted value.
     */
    formatTerms: function (bValue) {
      return !!bValue;
    },

    /**
     * Opens the message popover.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    handleMessagePopoverPress: function (oEvent) {
      if (!this._messagePopover) {
        this._messagePopover = new MessagePopover({
          items: {
            path: "messages>/messages",
            template: new MessageItem({
              type: "{messages>type}",
              title: "{messages>title}",
              description: "{messages>description}",
              subtitle: "{messages>subtitle}",
              counter: "{messages>counter}"
            })
          }
        });

        this.getView().byId("messagePopoverBtn").addDependent(this._messagePopover);
      }

      this._messagePopover.toggle(oEvent.getSource());
    }
  });
});
