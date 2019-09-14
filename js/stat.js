'use strict';

var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

/**
 * Отрисовка прямоугольника
 * @param {*} ctx
 * @param integer x Координата X
 * @param integer y Координата y
 * @param string color Цвет заливки прямоугальника
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Поиск максимального значения в массиве
 * @param array times
 */
var getMaxElement = function (times) {
  return Math.max.apply(null, times);
}

window.renderStatistics = function (ctx, names, times) {
  // Высисление максимального результата для составления пропорции
  var maxTime = getMaxElement(times);

  console.log(names);
  console.log(times);

  // Отрисовка тени облака
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
  // Отрисовка облака
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
}
