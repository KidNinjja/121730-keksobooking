  'use strict';


  window.synchronizeFields = function (
      syncFieldOne,
      syncFieldTwo,
      syncCollectionOne,
      syncCollectionTwo,
      syncFieldValue) {


    syncFieldOne.addEventListener('change', function (event) {

      for (var i = 0; i < syncCollectionOne.length; i++) {
        if (syncFieldOne[syncFieldValue] === syncCollectionOne[i]) {
          syncFieldTwo[syncFieldValue] = syncCollectionTwo[i];
        }
      }

    });


    syncFieldTwo.addEventListener('change', function (event) {

      for (var i = 0; i < syncCollectionTwo.length; i++) {
        if (syncFieldTwo[syncFieldValue] === syncCollectionTwo[i]) {
          syncFieldOne[syncFieldValue] = syncCollectionOne[i];
        }
      }

    });


  };
