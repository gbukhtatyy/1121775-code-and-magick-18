'use strict';

(function () {

  var KEY_CODE_ESC = 27;
  var KEY_CODE_ENTER = 13;

  window.util = {
    KEY_CODE_ESC: KEY_CODE_ESC,
    KEY_CODE_ENTER: KEY_CODE_ENTER,

    getRandomInt: function (max) {
      return Math.floor(Math.random() * Math.floor(max));
    },

    getRandomElementArray: function (array) {
      return array[window.util.getRandomInt(array.length)];
    },

    initializationMove: function (element, elementTrigger) {
      var mousePosition;
      var isDown = false;
      var offset = [0, 0];

      elementTrigger.addEventListener('mousedown', function (evt) {
        isDown = true;
        offset = [
          element.offsetLeft - evt.clientX,
          element.offsetTop - evt.clientY
        ];
      });

      document.addEventListener('mouseup', function () {
        isDown = false;
      });

      document.addEventListener('mousemove', function (evt) {
        evt.preventDefault();
        if (isDown) {
          mousePosition = {
            x: evt.clientX,
            y: evt.clientY
          };
          element.style.left = (mousePosition.x + offset[0]) + 'px';
          element.style.top = (mousePosition.y + offset[1]) + 'px';
        }
      });
    }
  };
})();
