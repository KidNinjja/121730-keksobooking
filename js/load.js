  'use strict';

  window.load = (function () {

    return function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      if (typeof onError === 'function') {
        onError = onError;
      }

      xhr.addEventListener('load', function (evt) {
        if (evt.target.status >= 400) {
          onError('Failed to load data. Server returned status: ' + evt.target.status);
        } else if (evt.target.status >= 200) {
          onLoad(evt.target.response);
        }
      });

      xhr.addEventListener('error', onError);
      xhr.addEventListener('timeout', onError);

      xhr.responseType = 'json';

      // xhr.timeout = 10;

      xhr.open('GET', url);
      xhr.send();

    };
  }());
