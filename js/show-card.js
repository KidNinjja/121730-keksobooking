  'use strict';

  window.showCard = (function () {


    /* Диалоговое окно */
    var dialogWindow = document.querySelector('.dialog');
    var dialogCloseButton = document.querySelector('.dialog__close');


    dialogWindow.setAttribute('style', 'display: none');
    dialogWindow.setAttribute('role', 'dialog');
    dialogWindow.setAttribute('aria-hidden', 'true');


    dialogCloseButton.setAttribute('role', 'button');
    dialogCloseButton.setAttribute('aria-pressed', 'false');


    var focusPin = function (element) {
      element.focus();
    };


    var setupKeyDownHendler = function (event) {
      if (window.utils.isdeactivationEvent(event)) {
        window.showCard.setDisabledDialogWindow(event);
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
        window.setPinActive(focusPin);
      }
    };


    dialogCloseButton.addEventListener('click', setDisabledDialogWindow);
    dialogCloseButton.addEventListener('keydown', function (event) {
      if (window.utils.isActivateEvent(event)) {
        setDisabledDialogWindow(event);
      }
    });

    return {
      setActiveDialogWindow: setActiveDialogWindow,
      setDisabledDialogWindow: setDisabledDialogWindow
    };

  }());
