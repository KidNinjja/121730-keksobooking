  'use strict';
  (function () {

    var formWrapper = document.querySelector('.form__content');

     /* Поля форм */
    var formFields = {
      titleField: formWrapper.querySelector('#title'),
      pricePerNightField: formWrapper.querySelector('#price'),
      typeForPrice: formWrapper.querySelector('#type'),
      addressField: formWrapper.querySelector('#address'),
      dateOfStayStart: formWrapper.querySelector('#time'),
      dateOfStayEnd: formWrapper.querySelector('#timeout'),
      numberOfRoomsFiled: formWrapper.querySelector('#room_number'),
      numberOfSeatsField: formWrapper.querySelector('#capacity')
    };


    var syncValues = function (element, value) {
      element.value = value;
    };


    window.synchronizeFields(
        formFields.typeForPrice,
        formFields.pricePerNightField,
        syncValues
    );


    window.synchronizeFields(
        formFields.pricePerNightField,
        formFields.typeForPrice,
        syncValues
    );


    window.synchronizeFields(
        formFields.dateOfStayStart,
        formFields.dateOfStayEnd,
        syncValues
    );

    window.synchronizeFields(
        formFields.dateOfStayEnd,
        formFields.dateOfStayStart,
        syncValues
    );


    window.synchronizeFields(
        formFields.numberOfRoomsFiled,
        formFields.numberOfSeatsField,
        syncValues
    );


    window.synchronizeFields(
        formFields.numberOfSeatsField,
        formFields.numberOfRoomsFiled,
        syncValues
    );


    /* Добавление дополнительных атрибутов*/
    var setAttributeToElement = function () {

      formFields.titleField.setAttribute('required', 'required');
      formFields.titleField.setAttribute('minlength', '30');
      formFields.titleField.setAttribute('maxlength', '100');

      formFields.pricePerNightField.setAttribute('required', 'required');
      formFields.pricePerNightField.setAttribute('min', '1000');
      formFields.pricePerNightField.setAttribute('max', '1000000');
      formFields.pricePerNightField.setAttribute('step', '1000');

      formFields.addressField.setAttribute('required', 'required');

      window.setPinActive();
    };


    window.addEventListener('load', setAttributeToElement);


  }());
