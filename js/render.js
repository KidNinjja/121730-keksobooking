  'use strict';

  window.render = (function () {

    /* Шаблон pin элемента */
    var template = document.querySelector('#pin-template');
    var templateContainer = 'content' in template ? template.content : template;


    return function (pin) {
      var pinElement = templateContainer.querySelector('.pin').cloneNode(true);
      window.showCard.checkData(pin);

      pinElement.children[0].src = pin.author.avatar;
      pinElement.children[0].setAttribute('tabindex', '0');

      pinElement.style.left = pin.location.x + 'px';
      pinElement.style.top = pin.location.y + 'px';

      return pinElement;
    };

  }());
