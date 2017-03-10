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


      var cleanMap = function (map, collection) {
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


      var flag = 0;


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
        for (var i = 0; i < collection.length; i++) {
          if (collection[i] === parseValues(formData[i], collection[i])) {
            flag++;
          }
        }
        if (flag === 4) {
          pinMap.appendChild(window.render(obj));
        }
        pinElements = pinElementsWrapper.querySelectorAll('.pin');
        i = 0;
        flag = 0;
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


      var onload = function (data) {
        for (var i = 0; i < data.length; i++) {
          similarApartments.push(data[i]);
        }
        pinFilter();
      };


      var errorHandler = function (err) {
        window.console.log(err);
      };


      window.load(DATA_URL, onload, errorHandler);


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
