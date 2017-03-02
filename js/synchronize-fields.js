  'use strict';


  window.synchronizeFields = function (
    syncFieldOne,
    syncFieldTwo,
    syncCollectionOne,
    syncCollectionTwo,
    syncFieldValue) {


    var currentField = null;
    var currentValue = null;


    var checkTypeField = function (fieldElement, fieldElementValue) {
      if (fieldElement.options) {
        for (var i = 0; i < fieldElement.options.length; i++) {
          if (fieldElement.options[i].value === fieldElementValue) {
            fieldElement.options[i].selected = true;
            return fieldElement.options[i];
          }
        }
      } else {
        return fieldElement;
      }
    };


    syncFieldOne.addEventListener('change', function(event) {

      currentField = null;

      currentValue = event.target.value || event.target.options[event.target.selectedIndex].value;

      for (var i = 0; i < syncCollectionOne.length; i++) {
        if (parseInt(syncCollectionOne[i], 10) === parseInt(currentValue), 10) {
          currentField = checkTypeField(syncFieldTwo, currentValue);
          console.log(currentField);
          currentField.value = syncCollectionOne[i];
        }
      }

    });


    syncFieldTwo.addEventListener('change', function(event) {

      currentField = null;

      currentValue = event.target.value || event.target.options[event.target.selectedIndex].value;

      for (var c = 0; c < syncCollectionTwo.length; c++) {
        if (parseInt(syncCollectionTwo[c], 10) === parseInt(currentValue, 10)) {
          currentField = checkTypeField(syncFieldOne, currentValue);
          currentField.value = syncCollectionTwo[c];
        }
      }

    });


  };
