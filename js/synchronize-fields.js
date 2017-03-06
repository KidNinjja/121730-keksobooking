  'use strict';


  window.synchronizeFields = (function () {

    return function (fieldOne, fieldTwo, syncValues) {
      var currentCount = null;
      fieldOne.addEventListener('change', function (event) {
        currentCount = fieldOne.value;
        syncValues(fieldTwo, currentCount);
      });

    };

  }());
