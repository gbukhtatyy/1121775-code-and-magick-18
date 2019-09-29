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
      elementTrigger.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var dragged = false;

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          dragged = true;

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          element.style.top = (element.offsetTop - shift.y) + 'px';
          element.style.left = (element.offsetLeft - shift.x) + 'px';

        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);

          if (dragged) {
            var onClickPreventDefault = function (clickEvt) {
              clickEvt.preventDefault();
              element.removeEventListener('click', onClickPreventDefault);
            };
            element.addEventListener('click', onClickPreventDefault);
          }

        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  };
})();
