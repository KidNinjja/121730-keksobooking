  'use strict';

  window.setPinActive = (function () {


    var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data ';


    return function (cb) {


      /* Маркеры на карте */
      var pinElementsWrapper = document.querySelector('.tokyo');
      var pinMap = document.querySelector('.tokyo__pin-map');
      var pinElements;
      var pinElementsImages = pinElementsWrapper.querySelectorAll('.rounded');
      var pinElementImageClass = document.querySelector('.rounded').className;
      var pinElementActiveClass = 'pin--active';
      var focusPin = null;
      var similarApartments = [];
      var filterValues = [];
      var filterFields = document.querySelector('.tokyo__filters');


      focusPin = cb;


      var onload = function (data) {
        for (var i = 0; i < data.length; i++) {
          similarApartments.push(data[i]);
        }
      };


      var getFilterValues = function () {
        pinElements = pinElementsWrapper.querySelectorAll('.pin');
        cleanMap(pinMap, pinElements);
        filterValues = [];
        for (var i = 0; i < filterFields.length; i++) {
          if (filterFields[i].options) {
            filterValues.push(filterFields[i].options[filterFields[i].selectedIndex].value);
          }
        }
        pinFilter(filterValues);
      };


      var pinFilter = function (collection) {
        var currentProp;
        for (var i = 0; i < similarApartments.length; i++) {
          for (var variable in similarApartments[i].offer) {
            if (similarApartments[i].offer.hasOwnProperty(variable)) {
              currentProp = variable + ' = ' + similarApartments[i].offer[variable];
              collection.length = similarApartments.length;
              currentProp = currentProp.split('=')[1];
              for (var c = 0; c < collection.length; c++) {
                if (collection[c] === currentProp.split(' ')[1]) {
                  pinMap.appendChild(window.render(similarApartments[i]));
                  break;
                } else if (collection[c] === 'any' && currentProp.split(' ')[1] === '0') {
                  pinMap.appendChild(window.render(similarApartments[i]));
                  break;
                }
              }
            }
          }
        }
      };


      filterFields.addEventListener('change', getFilterValues);


      var errorHandler = function (err) {
        window.console.log(err);
      };


      window.load(DATA_URL, onload, errorHandler);


      var setAttribute = function (collection, attributeName, attributeCount) {
        for (var i = 0; i < collection.length; i++) {
          collection[i].setAttribute(attributeName, attributeCount);
        }
      };


      var cleanMap = function (map, collection) {
        for (var i = 0; i < collection.length; i++) {
          if (collection[i].classList.contains('pin__main')) {
            continue;
          } else {
            map.removeChild(collection[i]);
          }
        }
      };


      var removeActiveClass = function (collection, activeClass) {
        setAttribute(pinElementsImages, 'aria-checked', 'false');
        for (var i = 0; i < collection.length; i++) {
          if (collection[i].classList.contains(activeClass)) {
            collection[i].classList.remove(activeClass);
            if (typeof focusPin === 'function') {
              focusPin(collection[i].firstChild);
            }
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
      };


      var pinHandler = function (event) {
        if (event.target.classList.contains(pinElementImageClass)) {
          removeActiveClass(pinElements, pinElementActiveClass);
          window.showCard.setActiveDialogWindow(event);
          setActivePin(event);
        }
      };


      pinElementsWrapper.addEventListener('click', pinHandler, false);
      pinElementsWrapper.addEventListener('keydown', function (event) {
        if (window.utils.isActivateEvent(event)) {
          pinHandler(event);
        }
      });


      pinElements = pinElementsWrapper.querySelectorAll('.pin');


      return similarApartments;


    };


  }());
