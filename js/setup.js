'use strict';

(function () {
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

  var SETUP_FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var WIZARDS_NUMBER = 4;

  var getRandomWizards = function (amount) {
    var characters = [];

    for (var i = 0; i < amount; i++) {
      characters.push({
        name: window.util.getRandomElementArray(SETUP_NAMES),
        surname: window.util.getRandomElementArray(SETUP_SURNAMES),
        coatColor: window.util.getRandomElementArray(SETUP_COAT_COLORS),
        eyesColor: window.util.getRandomElementArray(SETUP_EYES_COLOR),
      });
    }

    return characters;
  };

  var userDialog = document.querySelector('.setup');
  var setupWizardForm = document.querySelector('.setup-wizard-form');
  var similarListElement = document.querySelector('.setup-similar-list');

  var submitLoadSetupWizardFormHandeler = function (response) {
    console.log(response);
    closeSetupPopup();
  };
  var submitErrorSetupWizardFormHandeler = function (message) {
    window.error.show(message);
  };

  setupWizardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(setupWizardForm);

    window.backend.save(data, submitLoadSetupWizardFormHandeler, submitErrorSetupWizardFormHandeler);
  });

  var similarWizzardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var loadGetWizardsHandler = function (wizards) {
    var showWizards = window.util.getRandomElementsArray(wizards, WIZARDS_NUMBER);

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < showWizards.length; i++) {
      var wizzardElement = similarWizzardTemplate.cloneNode(true);

      wizzardElement.querySelector('.setup-similar-label').textContent = showWizards[i].name;
      wizzardElement.querySelector('.wizard-coat').style.fill = showWizards[i].colorCoat;
      wizzardElement.querySelector('.wizard-eyes').style.fill = showWizards[i].colorEyes;

      fragment.appendChild(wizzardElement);
    }

    similarListElement.appendChild(fragment);
  };

  var errorGetWizardsHandler = function (message) {
    window.error.show(message);
  };

  window.backend.load(loadGetWizardsHandler, errorGetWizardsHandler);

  document.querySelector('.setup-similar').classList.remove('hidden');

  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var setupFormElement = document.querySelector('.setup-wizard-form');
  var setupSubmitElement = document.querySelector('.setup-submit');
  var setupUserNameElement = document.querySelector('.setup-user-name');

  var onSetupPopupEscPress = function (evt) {
    // Если фокус находится на форме ввода имени, то окно закрываться не должно
    if (event.target === setupUserNameElement) {
      return;
    }

    // Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
    if (evt.keyCode === window.util.KEY_CODE_ESC) {
      closeSetupPopup();
    }
  };

  var openSetupPopup = function (evt) {
    evt.preventDefault();
    userDialog.style.top = '80px';
    userDialog.style.left = '50%';

    userDialog.classList.remove('hidden');

    document.addEventListener('keydown', onSetupPopupEscPress);
  };

  var closeSetupPopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onSetupPopupEscPress);
  };

  var submitSetupPopup = function () {
    setupFormElement.submit();
  };

  setupOpenElement.addEventListener('click', function (evt) {
    openSetupPopup(evt);
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KEY_CODE_ENTER) {
      openSetupPopup(evt);
    }
  });

  setupCloseElement.addEventListener('click', function () {
    closeSetupPopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KEY_CODE_ENTER) {
      closeSetupPopup();
    }
  });

  setupSubmitElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KEY_CODE_ENTER) {
      submitSetupPopup();
    }
  });

  window.util.initializationMove(userDialog, document.querySelector('.upload'));

  // Изменение цвета мантии персонажа по нажатию
  var wizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
  var wizardCoatInputElement = document.querySelector('.setup input[name=coat-color]');

  var wizardCoatClickHandler = function () {
    var colorCoat = window.util.getRandomElementArray(SETUP_COAT_COLORS);

    wizardCoatInputElement.value = colorCoat;
    wizardCoatElement.style.fill = colorCoat;
  };

  wizardCoatElement.addEventListener('click', wizardCoatClickHandler);

  // Изменение цвета глаз персонажа по нажатию
  var wizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesInputElement = document.querySelector('.setup input[name=eyes-color]');

  var wizardEyesClickHandler = function () {
    var colorEyes = window.util.getRandomElementArray(SETUP_EYES_COLOR);

    wizardEyesInputElement.value = colorEyes;
    wizardEyesElement.style.fill = colorEyes;
  };
  wizardEyesElement.addEventListener('click', wizardEyesClickHandler);

  // Изменение цвета фаерболов по нажатию
  var wizardFireballElement = document.querySelector('.setup-fireball-wrap');
  var wizardFireballInputElement = document.querySelector('.setup input[name=fireball-color]');

  var wizardFireballClickHandler = function () {
    var colorFireball = window.util.getRandomElementArray(SETUP_FIREBALL_COLOR);

    wizardFireballInputElement.value = colorFireball;
    wizardFireballElement.style.backgroundColor = colorFireball;
  };

  wizardFireballElement.addEventListener('click', wizardFireballClickHandler);
})();
