  'use strict';
  (function () {


    var typeOfHousingName = [
      'Квартира',
      'Лачуга',
      'Дворец'
    ];

    var typeOfHousingFieldCount = [
      '1000',
      '0',
      '10000'
    ];


    var dateOfStayStartCount = [
      '12',
      '13',
      '14'
    ];

    var dateOfStayEndCount = [
      '12',
      '13',
      '14'
    ];


    var numberOfRoomsFiledCount = [
      '1 комната',
      '2 комнаты',
      '100 комнат'
    ];

    var numberOfSeatsFieldCount = [
      '0',
      '1',
      '1',
    ];


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


    window.synchronizeFields(
        formGroups.typeForPrice,
        formGroups.pricePerNightField,
        typeOfHousingName,
        typeOfHousingFieldCount,
        'value'
    );


    window.synchronizeFields(
        formGroups.dateOfStayStart,
        formGroups.dateOfStayEnd,
        dateOfStayStartCount,
        dateOfStayEndCount,
        'value'
    );


    window.synchronizeFields(
        formGroups.numberOfRoomsFiled,
        formGroups.numberOfSeatsField,
        numberOfRoomsFiledCount,
        numberOfSeatsFieldCount,
        'value'
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
