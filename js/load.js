  'use strict';

  window.load = (function () {

    var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data ';

    var errorHandler = function (err) {
      window.console.log(err);
    };

    return function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      if (typeof onError === 'function') {
        errorHandler = onError;
      }

      xhr.addEventListener('load', function (evt) {
        if (evt.target.status >= 400) {
          errorHandler('Failed to load data. Server returned status: ' + evt.target.status);
        } else if (evt.target.status >= 200) {
          onLoad(evt.target.response);
        }
      });

      xhr.addEventListener('error', errorHandler);
      xhr.addEventListener('timeout', errorHandler);

      xhr.responseType = 'json';

      // xhr.timeout = 10;

      xhr.open('GET', DATA_URL);
      xhr.send();

    };
  }());
