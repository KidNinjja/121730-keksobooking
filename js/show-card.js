  'use strict';

  window.showCard = (function () {


    /* Диалоговое окно */
    var dialogWindow = document.querySelector('.dialog');
    var dialogCloseButton = document.querySelector('.dialog__close');
    var dialogWindowAvatar = document.querySelector('.dialog__title');
    var currentCoords = {};


    dialogWindow.setAttribute('style', 'display: none');
    dialogWindow.setAttribute('role', 'dialog');
    dialogWindow.setAttribute('aria-hidden', 'true');


    dialogCloseButton.setAttribute('role', 'button');
    dialogCloseButton.setAttribute('aria-pressed', 'false');


    var arrCollection = [];
    var authorElement = '';


    var focusPin = function (element) {
      element.firstElementChild.focus();
    };


    var checkData = function (object) {
      if (typeof object !== 'undefined') {
        arrCollection.push(object);
      }
      return arrCollection;
    };


    var setData = function (currentObj) {
      for (var i = 0; i < currentObj.length; i++) {
        if (typeof authorElement === 'undefined') {
          continue;
        } else if (authorElement[1] === currentObj[i].author.avatar) {
          dialogWindow.childNodes[1].firstElementChild.src = currentObj[i].author.avatar;
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
      dialogWindow.style.left = currentCoords.x;
      dialogWindow.style.top = currentCoords.y;
      dialogWindow.style.zIndex = '999';
      dialogWindow.setAttribute('aria-hidden', 'false');
      dialogCloseButton.setAttribute('aria-pressed', 'false');

      authorElement = '';
      authorElement = event.target.src.split('/121730-keksobooking/');

      setData(checkData());

    };


    var setDisabledDialogWindow = function (event) {
      if (event.target.parentNode === dialogCloseButton || event.target === dialogCloseButton || event.target) {
        document.removeEventListener('keydown', setupKeyDownHendler);
        dialogWindow.setAttribute('style', 'display: none');
        dialogWindow.setAttribute('aria-hidden', 'true');
        dialogCloseButton.setAttribute('aria-pressed', 'true');
        window.setPinActive(null);
      }
    };


    dialogCloseButton.addEventListener('click', setDisabledDialogWindow);
    dialogCloseButton.addEventListener('keydown', function (event) {
      if (window.utils.isActivateEvent(event)) {
        setDisabledDialogWindow(event);
        window.setPinActive(focusPin);
      }
    });


    dialogWindowAvatar.addEventListener('mousedown', function (event) {
      event.preventDefault();

      var startCoords = {
        x: event.clientX,
        y: event.clientY
      };

      var onMouseMove = function (moveEvent) {
        moveEvent.preventDefault();

        var shift = {
          x: startCoords.x - moveEvent.clientX,
          y: startCoords.y - moveEvent.clientY
        };

        startCoords = {
          x: moveEvent.clientX,
          y: moveEvent.clientY
        };

        dialogWindow.style.top = (dialogWindow.offsetTop - shift.y) + 'px';
        dialogWindow.style.left = (dialogWindow.offsetLeft - shift.x) + 'px';
        dialogWindow.style.zIndex = '999';

        currentCoords.x = dialogWindow.style.left;
        currentCoords.y = dialogWindow.style.top;

      };

      var onMouseUp = function (upEvent) {
        upEvent.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });


    return {
      setActiveDialogWindow: setActiveDialogWindow,
      setDisabledDialogWindow: setDisabledDialogWindow,
      checkData: checkData
    };


  }());
