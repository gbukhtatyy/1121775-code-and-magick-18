'use strict';

(function () {

  var KEY_CODE_ESC = 27;
  var KEY_CODE_ENTER = 13;

  window.util = {
    KEY_CODE_ESC: KEY_CODE_ESC,
    KEY_CODE_ENTER: KEY_CODE_ENTER,

    /**
     * Получение случайного числа в заданном диапозоне
     *
     * @param {number} max максимальное значение
     * @param {number} min минимальное значение
     * @return {number} случайное значение в заданных диапозонах
     */
    getRandomInt: function (max, min) {
      max = max ? max : 1;
      min = min ? min : 0;

      return Math.floor(Math.random() * Math.floor(max - min)) + min;
    },

    /**
     * Получение случайного элемента из массива
     * @param {Array} array
     * @return {*} случайных элемент массива
     */
    getRandomElementArray: function (array) {
      return array[window.util.getRandomInt(array.length)];
    },

    /**
     * Получение перемешанного массива
     * @param {Array} array исходный массив
     * @return {Array} перемешанный массив
     */
    shuffleArray: function (array) {
      return array.slice(0).sort(function () {
        return Math.random() - 0.5;
      });
    },

    /**
     * Получение amount случайных элементов из массива array
     * @param {Array} array исходный массив
     * @param {number} amount кол-во случайных элементов
     * @return {Array} массив случайных элементов из массива array
     */
    getRandomElementsArray: function (array, amount) {
      return window.util.shuffleArray(array).slice(0, amount);
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
