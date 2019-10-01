'use strict';

(function () {
  var template = '<span class="error_message">message</span><span class="error__close" tabindex="0">&times;</span>';

  var removeErrors = function () {
    var elements = document.querySelectorAll('.error');
    elements.forEach(function (element) {
      element.remove();
    });
  };

  var errorCloseHandler = function (element) {
    return function () {
      element.remove();
    };
  };

  window.error = {
    show: function (message) {
      removeErrors();

      var messageElement = document.createElement('div');
      messageElement.classList.add('error');

      messageElement.innerHTML = template;

      messageElement.querySelector('.error_message').textContent = message;
      messageElement.querySelector('.error__close').addEventListener('click', errorCloseHandler(messageElement));

      document.querySelector('body').appendChild(messageElement);
    }
  };
})();
