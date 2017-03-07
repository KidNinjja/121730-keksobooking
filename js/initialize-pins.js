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

      focusPin = cb;


      var onload = function (data) {
        for (var i = 0; i < data.length; i++) {
          similarApartments.push(data[i]);
        }
        similarApartments.forEach(function (elementData, c) {
          if (c < 3) {
            pinMap.appendChild(window.render(elementData));
          } else {
            return;
          }
        });
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
      window.addEventListener('load', cleanMap(pinMap, pinElements));


      return similarApartments;
    };

  }());
