  'use strict';


  window.synchronizeFields = (function () {

    return function (fieldOne, fieldTwo, collectionOne, collectionTwo, fieldValue) {

      fieldOne.addEventListener('change', function (event) {

        for (var i = 0; i < collectionOne.length; i++) {
          if (fieldOne[fieldValue] === collectionOne[i]) {
            fieldTwo[fieldValue] = collectionTwo[i];
          }
        }

      });


      fieldTwo.addEventListener('change', function (event) {

        for (var i = 0; i < collectionTwo.length; i++) {
          if (fieldTwo[fieldValue] === collectionTwo[i]) {
            fieldOne[fieldValue] = collectionOne[i];
          }
        }

      });

    };

  }());
