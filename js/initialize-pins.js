  'use strict';

  window.setPinActive = (function () {

    return function (cb) {


      /* Маркеры на карте */
      var pinElementsWrapper = document.querySelector('.tokyo');
      var pinElements = pinElementsWrapper.querySelectorAll('.pin');
      var pinElementsImages = pinElementsWrapper.querySelectorAll('.rounded');
      var pinElementImageClass = document.querySelector('.rounded').className;
      var pinElementActiveClass = 'pin--active';
      var focusPin = null;

      focusPin = cb;


      var setAttribute = function (collection, attributeName, attributeCount) {
        for (var i = 0; i < collection.length; i++) {
          collection[i].setAttribute(attributeName, attributeCount);
        }
      };


      /* Установка отрибутов */
      setAttribute(pinElementsImages, 'role', 'radio');
      setAttribute(pinElementsImages, 'aria-checked', 'false');
      setAttribute(pinElementsImages, 'tabindex', '0');


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


      var setActivePin = function (event) {
        event.target.parentNode.classList.add(pinElementActiveClass);
        event.target.setAttribute('aria-checked', 'true');
      };


      var pinHandler = function (event) {
        if (event.target.classList.contains(pinElementImageClass)) {
          removeActiveClass(pinElements, pinElementActiveClass);
          window.showCard.setActiveDialogWindow();
          setActivePin(event);
        }
      };


      pinElementsWrapper.addEventListener('click', pinHandler);
      pinElementsWrapper.addEventListener('keydown', function (event) {
        if (window.utils.isActivateEvent(event)) {
          pinHandler(event);
        }
      });


      /* Удаление class--active */
      removeActiveClass(pinElements, pinElementActiveClass);

    };

  }());
