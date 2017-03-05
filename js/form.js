  'use strict';
  (function () {


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


    window.setPinActive();


    var syncValues = function (element, value) {
      element.value = value;
    };


    window.synchronizeFields(
        formGroups.typeForPrice,
        formGroups.pricePerNightField,
        syncValues
    );


    window.synchronizeFields(
        formGroups.pricePerNightField,
        formGroups.typeForPrice,
        syncValues
    );


    window.synchronizeFields(
        formGroups.dateOfStayStart,
        formGroups.dateOfStayEnd,
        syncValues
    );

    window.synchronizeFields(
        formGroups.dateOfStayEnd,
        formGroups.dateOfStayStart,
        syncValues
    );


    window.synchronizeFields(
        formGroups.numberOfRoomsFiled,
        formGroups.numberOfSeatsField,
        syncValues
    );


    window.synchronizeFields(
        formGroups.numberOfSeatsField,
        formGroups.numberOfRoomsFiled,
        syncValues
    );


    /* Добавление дополнительных атрибутов*/
    var setAttributeToElement = function () {

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

  }());
