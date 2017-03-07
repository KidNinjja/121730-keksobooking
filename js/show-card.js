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

    var arrCollection = [];
    var coordsElement = [];

    var focusPin = function (element) {
      if (element.nextSibling) {
        element.nextSibling.focus();
      } else {
        element.focus();
      }
    };


    var checkData = function (object) {
      if (typeof object !== 'undefined') {
        arrCollection.push(object);
      }
      return arrCollection;
    };

    var setData = function (currentObj) {
      for (var i = 0; i < currentObj.length; i++) {
        if (typeof coordsElement === 'undefined') {
          continue;
        } else if (+coordsElement[0] === currentObj[i].location.x && +coordsElement[0] === currentObj[i].location.x) {
          dialogWindow.childNodes[3].children[0].textContent = currentObj[i].offer.title;
          dialogWindow.childNodes[3].children[1].textContent = currentObj[i].offer.address;
          dialogWindow.childNodes[3].children[2].textContent = currentObj[i].offer.price + ' ₽/ночь';
          dialogWindow.childNodes[3].children[3].textContent = currentObj[i].offer.type;
          dialogWindow.childNodes[3].children[4].textContent = currentObj[i].offer.rooms + ' комнаты для ' + currentObj[i].offer.guests + ' гостей';
          dialogWindow.childNodes[3].children[5].textContent = 'Заед после ' + currentObj[i].offer.checkin + ', выезд до ' + currentObj[i].offer.checkout;
          dialogWindow.childNodes[3].children[7].textContent = currentObj[i].offer.description;
          for (var c = 0; c < dialogWindow.childNodes[3].children[8].children.length; c++) {

            dialogWindow.childNodes[3].children[8].children[c].onerror = function () {
              this.src = 'img/avatars/default.png';
            };

            dialogWindow.childNodes[3].children[8].children[c].src = currentObj[i].offer.photos[c];

          }
          return;
        }
      }
    };

    var setupKeyDownHendler = function (event) {
      if (window.utils.isdeactivationEvent(event)) {
        window.showCard.setDisabledDialogWindow(event);
      }
    };

    var setActiveDialogWindow = function (event) {
      document.addEventListener('keydown', setupKeyDownHendler);
      dialogWindow.setAttribute('style', 'display: block');
      dialogWindow.setAttribute('aria-hidden', 'false');
      dialogCloseButton.setAttribute('aria-pressed', 'false');

      coordsElement = [];

      coordsElement.push(event.target.parentNode.style.left.replace('px', ''));
      coordsElement.push(event.target.parentNode.style.top.replace('px', ''));
      setData(checkData());

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
      setDisabledDialogWindow: setDisabledDialogWindow,
      checkData: checkData
    };

  }());
