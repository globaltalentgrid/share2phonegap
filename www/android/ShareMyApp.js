(function () {
    "use strict";

  var remainingAttempts = 10;

  function waitForAndCallHandlerFunction(itype, url) {
    if (typeof window.handleNewIntent === "function") {
      // Clear the intent when we have a handler
      cordova.exec(
          null,
          null,
          "ShareMyApp",
          "clearIntent",
          []);

      window.handleNewIntent(itype, url);
    } else if (remainingAttempts-- > 0) {
      setTimeout(function(){waitForAndCallHandlerFunction(itype ,url);}, 500);
    }
  }

  function triggerShareOpenURL() {
    cordova.exec(
        waitForAndCallHandlerFunction,
        null,
        "ShareMyApp",
        "checkIntent",
        []);
  }

  document.addEventListener("deviceready", triggerShareOpenURL, false);
}());
