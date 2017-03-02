  'use strict';

  window.initializePins = function () {


    /* Маркеры на карте */
    var pinElementsWrapper = document.querySelector('.tokyo');
    var pinElements = pinElementsWrapper.querySelectorAll('.pin');
    var pinElementsImages = pinElementsWrapper.querySelectorAll('.rounded');
    var pinElementImageClass = document.querySelector('.rounded').className;
    var pinElementActiveClass = 'pin--active';


    /* Диалоговое окно */
    var dialogWindow = document.querySelector('.dialog');
    var dialogCloseButton = document.querySelector('.dialog__close');


    dialogWindow.setAttribute('style', 'display: none');
    dialogWindow.setAttribute('role', 'dialog');
    dialogWindow.setAttribute('aria-hidden', 'true');

    dialogCloseButton.setAttribute('role', 'button');
    dialogCloseButton.setAttribute('aria-pressed', 'false');


    /* Коды символов */
    var ENTER_KEY_CODE = 13;
    var ESCAPE_KEY_CODE = 27;


    var isActivateEvent = function (event) {
      return event.keyCode && event.keyCode === ENTER_KEY_CODE;
    };


    var setupKeyDownHendler = function (event) {
      if (event.keyCode === ESCAPE_KEY_CODE) {
        setDisabledDialogWindow(event);
      }
    };


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
        }
      }
    };


    var setActiveDialogWindow = function () {
      document.addEventListener('keydown', setupKeyDownHendler);
      dialogWindow.setAttribute('style', 'display: block');
      dialogWindow.setAttribute('aria-hidden', 'false');
      dialogCloseButton.setAttribute('aria-pressed', 'false');
    };


    var setDisabledDialogWindow = function (event) {
      if (event.target.parentNode === dialogCloseButton || event.target === dialogCloseButton || event.target) {
        document.removeEventListener('keydown', setupKeyDownHendler);
        dialogWindow.setAttribute('style', 'display: none');
        dialogWindow.setAttribute('aria-hidden', 'true');
        dialogCloseButton.setAttribute('aria-pressed', 'true');
        removeActiveClass(pinElements, pinElementActiveClass);
      }
    };


    var setActivePin = function (event) {
      event.target.parentNode.classList.add(pinElementActiveClass);
      event.target.setAttribute('aria-checked', 'true');
    };


    var pinHandler = function (event) {
      if (event.target.classList.contains(pinElementImageClass)) {
        removeActiveClass(pinElements, pinElementActiveClass);
        setActiveDialogWindow();
        setActivePin(event);
      }
    };


    pinElementsWrapper.addEventListener('click', pinHandler);
    pinElementsWrapper.addEventListener('keydown', function (event) {
      if (isActivateEvent(event)) {
        pinHandler(event);
      }
    });


    dialogCloseButton.addEventListener('click', setDisabledDialogWindow);
    dialogCloseButton.addEventListener('keydown', function (event) {
      if (isActivateEvent(event)) {
        setDisabledDialogWindow(event);
      }
    });


    /* Удаление class--active */
    removeActiveClass(pinElements, pinElementActiveClass);


  };
