  'use strict';

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

  /* Коды символов */
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

   /* Поля форм */
  var formGroups = {
    formWrapper: document.querySelector('.form__content'),
    titleField: document.querySelector('#title'),
    pricePerNightField: document.querySelector('#price'),
    typeForPrice: document.querySelector('#type'),
    addressField: document.querySelector('#address'),
    dateOfStayStart: document.querySelector('#time'),
    dateOfStayEnd: document.querySelector('#timeout'),
    numberOfRoomsFiled: document.querySelector('#room_number'),
    numberOfSeatsField: document.querySelector('#capacity')
  };

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

  var deleteAttribute = function (collection, attributeName) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].removeAttribute(attributeName);
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


  var setCountFormFields = function (event) {
    var currentValue;
    switch (true) {
      case event.target === formGroups.dateOfStayStart || event.target === formGroups.dateOfStayEnd:
        currentValue = event.target.value;
        for (var i = 0; i < event.target.length; i++) {
          if (currentValue === formGroups.dateOfStayEnd[i].value || currentValue === formGroups.dateOfStayStart[i]) {
            deleteAttribute(formGroups.dateOfStayStart, 'selected');
            deleteAttribute(formGroups.dateOfStayEnd, 'selected');
            formGroups.dateOfStayStart[i].setAttribute('selected', 'selected');
            formGroups.dateOfStayEnd[i].setAttribute('selected', 'selected');
          }
        }
        break;
      case event.target === formGroups.pricePerNightField || event.target === formGroups.typeForPrice:
        currentValue = event.target.value;
        formGroups.pricePerNightField.value = currentValue;
        deleteAttribute(formGroups.typeForPrice, 'selected');
        formGroups.typeForPrice.options[formGroups.typeForPrice.selectedIndex].setAttribute('selected', 'selected');
        if (parseInt(currentValue, 10, 10) < 1000) {
          deleteAttribute(formGroups.typeForPrice, 'selected');
          formGroups.typeForPrice[1].setAttribute('selected', 'selected');
        } else if (parseInt(currentValue, 10) >= 1000 && parseInt(currentValue, 10) < 10000) {
          deleteAttribute(formGroups.typeForPrice, 'selected');
          formGroups.typeForPrice[0].setAttribute('selected', 'selected');
        } else if (parseInt(currentValue, 10) >= 10000) {
          deleteAttribute(formGroups.typeForPrice, 'selected');
          formGroups.typeForPrice[2].setAttribute('selected', 'selected');
        }
        break;
      case event.target === formGroups.numberOfRoomsFiled || event.target === formGroups.numberOfSeatsField:
        currentValue = event.target.value;
        if (parseInt(currentValue, 10) === 1) {
          deleteAttribute(formGroups.numberOfRoomsFiled, 'selected');
          deleteAttribute(formGroups.numberOfSeatsField, 'selected');
          formGroups.numberOfSeatsField[1].setAttribute('selected', 'selected');
          formGroups.numberOfRoomsFiled[0].setAttribute('selected', 'selected');
        } else if (parseInt(currentValue, 10) === 2) {
          deleteAttribute(formGroups.numberOfRoomsFiled, 'selected');
          deleteAttribute(formGroups.numberOfSeatsField, 'selected');
          formGroups.numberOfSeatsField[0].setAttribute('selected', 'selected');
          formGroups.numberOfRoomsFiled[1].setAttribute('selected', 'selected');
        }
        break;
      default:
    }
  };


  /* Добавление дополнительных атрибутов*/

  var setAttributeToElement = function () {
    /* Удаление class--active */
    removeActiveClass(pinElements, pinElementActiveClass);

    /* Установка отрибутов */
    setAttribute(pinElementsImages, 'role', 'radio');
    setAttribute(pinElementsImages, 'aria-checked', 'false');
    setAttribute(pinElementsImages, 'tabindex', '0');

    dialogWindow.setAttribute('role', 'dialog');
    dialogWindow.setAttribute('aria-hidden', 'true');

    dialogCloseButton.setAttribute('role', 'button');
    dialogCloseButton.setAttribute('aria-pressed', 'false');

    formGroups.titleField.setAttribute('required', 'required');
    formGroups.titleField.setAttribute('minlength', '30');
    formGroups.titleField.setAttribute('maxlength', '100');

    formGroups.pricePerNightField.setAttribute('required', 'required');
    formGroups.pricePerNightField.setAttribute('min', '1000');
    formGroups.pricePerNightField.setAttribute('max', '1000000');
    formGroups.pricePerNightField.setAttribute('step', '1000');

    formGroups.addressField.setAttribute('required', 'required');
  };

  window.addEventListener('load', setAttributeToElement);

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

  formGroups.formWrapper.addEventListener('click', setCountFormFields);
  formGroups.formWrapper.addEventListener('input', setCountFormFields);
