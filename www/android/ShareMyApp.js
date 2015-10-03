(function () {
    "use strict";

  var remainingAttempts = 10;

  function waitForAndCallHandlerFunction2(itype, url) {
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
      setTimeout(function(){waitForAndCallHandlerFunction2(itype ,url);}, 500);
    }
  }

  function triggerShareOpenURL() {
    cordova.exec(
        waitForAndCallHandlerFunction2,
        null,
        "ShareMyApp",
        "checkIntent",
        []);
  }

  document.addEventListener("deviceready", triggerShareOpenURL, false);
}());
