  'use strict';

  var mapMarkElementsData = {
    elementsCollection: document.querySelectorAll('.pin'),
    classActive: 'pin--active',
    cleanActiveClass: function (collection, classActive) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].classList.remove(classActive);
      }
    }
  };

  var dialogWindowData = {
    element: document.querySelector('.dialog'),
    closeButton: document.querySelector('.dialog__close'),
    openWindow: function functionName(activeElement) {
      activeElement.style = 'display: block';
    },
    closeWindow: function (activeElement) {
      activeElement.style = 'display: none';
    }

  };

  for (var i = 0; i < mapMarkElementsData.elementsCollection.length; i++) {
    mapMarkElementsData.elementsCollection[i].addEventListener('click', function (event) {
      event.preventDefault();

      mapMarkElementsData.cleanActiveClass(mapMarkElementsData.elementsCollection, mapMarkElementsData.classActive);
      event.target.parentNode.classList.add(mapMarkElementsData.classActive);
      dialogWindowData.openWindow(dialogWindowData.element);

    });
  }

  dialogWindowData.closeButton.addEventListener('click', function (event) {
    event.preventDefault();

    dialogWindowData.closeWindow(dialogWindowData.element);
    mapMarkElementsData.cleanActiveClass(mapMarkElementsData.elementsCollection, mapMarkElementsData.classActive);
  });


  var formGroups = {
    titleField: document.querySelector('#title'),
    pricePerNightField: document.querySelector('#price'),
    typeForPrice: document.querySelector('#type'),
    addressField: document.querySelector('#address'),
    dateOfStayStart: document.querySelector('#time'),
    dateOfStayEnd: document.querySelector('#timeout'),
    numberOfRoomsFiled: document.querySelector('#room_number'),
    numberOfSeatsField: document.querySelector('#capacity')
  };

  var setSettingsForFormFields = function () {
    formGroups.titleField.setAttribute('required', 'required');
    formGroups.titleField.setAttribute('minlength', '30');
    formGroups.titleField.setAttribute('maxlength', '100');

    formGroups.pricePerNightField.setAttribute('required', 'required');
    formGroups.pricePerNightField.setAttribute('min', '1000');
    formGroups.pricePerNightField.setAttribute('max', '1000000');
    formGroups.pricePerNightField.setAttribute('step', '1000');

    formGroups.addressField.setAttribute('required', 'required');

  };

  window.addEventListener('load', function () {
    setSettingsForFormFields();
  });

  var cleanAttribute = function (collection, elementAttributeName) {
    for (var c = 0; c < collection.length; c++) {
      collection[c].removeAttribute(elementAttributeName);
    }
  };

  var timeOfStayStart = {};
  var timeOfStayEnd = {};
  var bindModelSelect = function (nameObject, property, domElement) {
    Object.defineProperty(nameObject, property, {
      get: function () {
        return domElement.options.selectedIndex;
      },
      set: function (newValue) {
        domElement.selectedIndex = newValue;
      }
    });
  };

  bindModelSelect(timeOfStayStart, 'optionIndex', formGroups.dateOfStayStart);
  bindModelSelect(timeOfStayEnd, 'optionIndex', formGroups.dateOfStayEnd);


  var typeOfHousing = {};
  var costOfHousing = {};
  var bindModelHousingFilds = function (nameObject, property, domElement) {
    Object.defineProperty(nameObject, property, {
      get: function () {
        if (domElement.options) {
          return [domElement, domElement.options.selectedIndex];
        } else {
          return domElement.value;
        }
      },
      set: function (newValue) {
        if (domElement.options) {
          domElement.selectedIndex = newValue;
        } else {
          domElement.value = newValue;
        }
      }
    });
  };

  bindModelHousingFilds(typeOfHousing, 'elementIndex', formGroups.typeForPrice);
  bindModelHousingFilds(costOfHousing, 'elementValue', formGroups.pricePerNightField);


  var numberOfrooms = {};
  var numberOfseats = {};
  var bindModelSelectNumber = function (nameObject, property, domElement) {
    Object.defineProperty(nameObject, property, {
      get: function () {
        return [domElement, domElement.options.selectedIndex];
      },
      set: function (newValue) {
        domElement.selectedIndex = newValue;
      }
    });
  };

  bindModelSelectNumber(numberOfrooms, 'elementIndex', formGroups.numberOfRoomsFiled);
  bindModelSelectNumber(numberOfseats, 'elementIndex', formGroups.numberOfSeatsField);


  formGroups.dateOfStayStart.addEventListener('change', function (event) {
    cleanAttribute(formGroups.dateOfStayStart.options, 'selected');
    cleanAttribute(formGroups.dateOfStayEnd.options, 'selected');
    timeOfStayEnd.optionIndex = timeOfStayStart.optionIndex;
    formGroups.dateOfStayStart.options[formGroups.dateOfStayStart.selectedIndex].setAttribute('selected', 'selected');
    formGroups.dateOfStayEnd.options[formGroups.dateOfStayEnd.selectedIndex].setAttribute('selected', 'selected');
  });

  formGroups.dateOfStayEnd.addEventListener('change', function (event) {
    cleanAttribute(formGroups.dateOfStayEnd.options, 'selected');
    cleanAttribute(formGroups.dateOfStayStart.options, 'selected');
    timeOfStayStart.optionIndex = timeOfStayEnd.optionIndex;
    formGroups.dateOfStayEnd.options[formGroups.dateOfStayEnd.selectedIndex].setAttribute('selected', 'selected');
    formGroups.dateOfStayStart.options[formGroups.dateOfStayStart.selectedIndex].setAttribute('selected', 'selected');
  });

  formGroups.typeForPrice.addEventListener('change', function (event) {
    cleanAttribute(formGroups.typeForPrice, 'selected');
    switch (true) {
      case typeOfHousing.elementIndex[1] === 0:
        costOfHousing.elementValue = 1000;
        typeOfHousing.elementIndex[0].options[typeOfHousing.elementIndex[0].selectedIndex].setAttribute('selected', 'selected');
        break;
      case typeOfHousing.elementIndex[1] === 1:
        costOfHousing.elementValue = 500;
        typeOfHousing.elementIndex[0].options[typeOfHousing.elementIndex[0].selectedIndex].setAttribute('selected', 'selected');
        break;
      case typeOfHousing.elementIndex[1] === 2:
        costOfHousing.elementValue = 10000;
        typeOfHousing.elementIndex[0].options[typeOfHousing.elementIndex[0].selectedIndex].setAttribute('selected', 'selected');
        break;
      default:
    }
  });

  formGroups.pricePerNightField.addEventListener('input', function (event) {
    cleanAttribute(formGroups.typeForPrice, 'selected');
    switch (true) {
      case costOfHousing.elementValue > 0 && costOfHousing.elementValue < 1000:
        typeOfHousing.elementIndex = 1;
        typeOfHousing.elementIndex[0].options[typeOfHousing.elementIndex[0].selectedIndex].setAttribute('selected', 'selected');
        break;
      case costOfHousing.elementValue >= 1000 && costOfHousing.elementValue < 10000:
        typeOfHousing.elementIndex = 0;
        typeOfHousing.elementIndex[0].options[typeOfHousing.elementIndex[0].selectedIndex].setAttribute('selected', 'selected');
        break;
      case costOfHousing.elementValue >= 10000:
        typeOfHousing.elementIndex = 2;
        typeOfHousing.elementIndex[0].options[typeOfHousing.elementIndex[0].selectedIndex].setAttribute('selected', 'selected');
        break;
      default:
    }
  });

  formGroups.numberOfRoomsFiled.addEventListener('change', function () {
    if (numberOfrooms.elementIndex[1] === 0) {
      numberOfseats.elementIndex = 1;
    } else {
      numberOfseats.elementIndex = 0;
    }
  });

  formGroups.numberOfSeatsField.addEventListener('change', function () {
    if (numberOfseats.elementIndex[1] === 0) {
      numberOfrooms.elementIndex = 2;
    } else {
      numberOfrooms.elementIndex = 0;
    }
  });
