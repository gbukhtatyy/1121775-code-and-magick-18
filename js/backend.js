'use strict';

(function () {
  var METHOD_LOAD = 'GET';
  var METHOD_SAVE = 'POST';
  var URL_LOAD = "https://js.dump.academy/code-and-magick/data";
  var URL_SAVE = "https://js.dump.academy/code-and-magick";

  var sendXMLHttpRequest = function (url, method, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open(method, url);

    var params = data ? data : new FormData();

    xhr.send(params);
  };

  window.backend = {
    load: function (onLoad, onError) {
      sendXMLHttpRequest(URL_LOAD, METHOD_LOAD, false, onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      sendXMLHttpRequest(URL_SAVE, METHOD_SAVE, data, onLoad, onError);
    },
  };
})();
