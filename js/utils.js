  'use strict';

  window.utils = (function () {
    /* Коды символов */
    var ENTER_KEY_CODE = 13;
    var ESCAPE_KEY_CODE = 27;


    var isActivateEvent = function (event) {
      return event.keyCode && event.keyCode === ENTER_KEY_CODE;
    };

    var isdeactivationEvent = function (event) {
      return event.keyCode && event.keyCode === ESCAPE_KEY_CODE;
    };

    return {
      isActivateEvent: isActivateEvent,
      isdeactivationEvent: isdeactivationEvent
    };

  }());
