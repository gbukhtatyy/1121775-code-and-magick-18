'use strict';

var SETUP_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SETUP_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var SETUP_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var SETUP_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomElementArray = function (array) {
  return array[getRandomInt(array.length)];
};

var getRandomWizards = function (amount) {
  var characters = [];

  for (var i = 0; i < amount; i++) {
    characters.push({
      name: getRandomElementArray(SETUP_NAMES),
      surname: getRandomElementArray(SETUP_SURNAMES),
      coatColor: getRandomElementArray(SETUP_COAT_COLORS),
      eyesColor: getRandomElementArray(SETUP_EYES_COLOR),
    });
  }

  return characters;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizzardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = getRandomWizards(4);

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  var wizzardElement = similarWizzardTemplate.cloneNode(true);

  wizzardElement.querySelector('.setup-similar-label').textContent = wizards[i].name + ' ' + wizards[i].surname;
  wizzardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizzardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  fragment.appendChild(wizzardElement);
}

similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
