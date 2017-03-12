  'use strict';

  window.setPinActive = (function () {


    var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data ';

    /* Маркеры на карте */
    var pinElementsWrapper = document.querySelector('.tokyo');
    var pinMap = pinElementsWrapper.querySelector('.tokyo__pin-map');
    var pinElements;
    var pinElementsImages = pinElementsWrapper.querySelectorAll('.rounded');
    var pinElementImageClass = pinElementsWrapper.querySelector('.rounded').className;
    var pinElementActiveClass = 'pin--active';
    var pinMain = pinElementsWrapper.querySelector('.pin__main');
    var similarApartments = [];
    var filterValues = [];
    var filterFields = pinElementsWrapper.querySelector('.tokyo__filters');
    var formAddress = document.querySelector('#address');
    var currentElem;


    var cleanMap = function (map, collection) {
      pinElements = pinElementsWrapper.querySelectorAll('.pin');
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].classList.contains('pin__main')) {
          continue;
        } else {
          map.removeChild(collection[i]);
        }
      }
    };


    var getFilterValues = function () {
      filterValues = [];
      for (var i = 0; i < filterFields.length; i++) {
        if (filterFields[i].options) {
          filterValues.push(filterFields[i].options[filterFields[i].selectedIndex].value);
        }
      }
    };


    var objProps = [
      'price',
      'type',
      'rooms',
      'guests'
    ];


    var currentProps = [];
    var deletedItem = [];


    var findProp = function (collection) {
      var i = 0;
      for (var variable in collection.offer) {
        if (collection.offer.hasOwnProperty(variable)) {
          if (variable === objProps[i]) {
            var prop = variable + ':' + collection.offer[variable];
            currentProps.push(prop.split(':')[1]);
            i++;
          }
        }
      }
      deletedItem = [];
      deletedItem = currentProps.splice(1, 1);
      currentProps.splice(0, 0, deletedItem[0]);
    };


    var parseValues = function (str, count) {
      if (str === 'any') {
        return count;
      }
      switch (true) {
        case str === 'low':
          if (+count > 0 && +count < 10000) {
            return count;
          }
          break;
        case str === 'middle':
          if (+count >= 10000 && +count < 50000) {
            return count;
          }
          break;
        case str === 'hight':
          if (+count >= 50000 && +count < 100000000) {
            return count;
          }
          break;
      }
      return str;
    };


    var setProp = function (collection, formData, obj) {
      var matches = 0;
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] === parseValues(formData[i], collection[i])) {
          matches++;
        }
      }
      if (matches === 4) {
        pinMap.appendChild(window.render(obj));
      }
      i = 0;
      matches = 0;
      currentProps = [];
      pinElements = pinElementsWrapper.querySelectorAll('.pin');
    };


    var pinFilter = function () {
      cleanMap(pinMap, pinElements);
      currentProps = [];
      getFilterValues();

      for (var i = 0; i < similarApartments.length; i++) {
        if (currentProps.length === 4) {
          setProp(currentProps, filterValues, similarApartments[i - 1]);
        }
        findProp(similarApartments[i]);
      }
    };


    filterFields.addEventListener('change', pinFilter);

    var setAttribute = function (collection, attributeName, attributeCount) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].setAttribute(attributeName, attributeCount);
      }
    };


    var removeActiveClass = function (collection, activeClass) {
      setAttribute(pinElementsImages, 'aria-checked', 'false');
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].classList.contains(activeClass)) {
          collection[i].classList.remove(activeClass);

        }
      }
    };


    /* Установка отрибутов */
    setAttribute(pinElementsImages, 'role', 'radio');
    setAttribute(pinElementsImages, 'aria-checked', 'false');
    setAttribute(pinElementsImages, 'tabindex', '0');


    var setActivePin = function (event) {
      pinElements = pinElementsWrapper.querySelectorAll('.pin');
      removeActiveClass(pinElements, pinElementActiveClass);
      event.target.parentNode.classList.add(pinElementActiveClass);
      event.target.setAttribute('aria-checked', 'true');
      event.target.addEventListener('mousedown', dragPin);
      currentElem = event.target.parentNode;
    };


    var removeSingleElementClass = function (cb, element, activeClass) {
      if (typeof element !== 'undefined') {
        element.classList.remove(activeClass);
      }
      if (typeof cb === 'function') {
        cb(element);
      }
    };


    var pinHandler = function (event) {
      if (event.target.classList.contains(pinElementImageClass) && event.target.offsetParent !== pinMain) {
        removeActiveClass(pinElements, pinElementActiveClass);
        window.showCard.setActiveDialogWindow(event);
        setActivePin(event);
      }
    };


    var dragPin = function (dragEvent) {
      dragEvent.preventDefault();

      var startCoords = {
        x: dragEvent.clientX,
        y: dragEvent.clientY
      };

      var shift = {};

      var onMouseMove = function (moveEvent) {

        moveEvent.preventDefault();

        shift = {
          x: startCoords.x - moveEvent.clientX,
          y: startCoords.y - moveEvent.clientY
        };

        startCoords = {
          x: moveEvent.clientX,
          y: moveEvent.clientY
        };

        var eventP = dragEvent.target.offsetParent || dragEvent.path[1];

        eventP.style.top = (eventP.offsetTop - shift.y) + 'px';
        eventP.style.left = (eventP.offsetLeft - shift.x) + 'px';
        eventP.style.zIndex = '999';
        formAddress.value = ' x: ' + eventP.style.left + ' , ' + ' y: ' + eventP.style.top;

      };


      var onMouseUp = function (upEvent) {
        upEvent.preventDefault();
        pinMap.removeEventListener('mousemove', onMouseMove);
        pinMap.removeEventListener('mouseup', onMouseUp);
      };


      pinMap.addEventListener('mousemove', onMouseMove);
      pinMap.addEventListener('mouseup', onMouseUp);

    };


    pinElements = pinElementsWrapper.querySelectorAll('.pin');


    var onload = function (data) {
      for (var i = 0; i < data.length; i++) {
        similarApartments.push(data[i]);
      }
      pinFilter();
    };


    var errorHandler = function (err) {
      window.console.log(err);
    };


    pinElementsWrapper.addEventListener('click', pinHandler, false);
    pinElementsWrapper.addEventListener('keydown', function (event) {
      if (window.utils.isActivateEvent(event)) {
        pinHandler(event);
      }
    });

    return function (cb) {

      window.load(DATA_URL, onload, errorHandler);
      removeSingleElementClass(cb, currentElem, pinElementActiveClass);

    };


  }());
