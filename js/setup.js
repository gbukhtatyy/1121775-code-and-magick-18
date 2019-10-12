'use strict';

(function () {
  // Константы
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

  // Переменные
  var userDialog = document.querySelector('.setup');
  var setupWizardForm = document.querySelector('.setup-wizard-form');
  var similarListElement = document.querySelector('.setup-similar-list');

  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var setupFormElement = document.querySelector('.setup-wizard-form');
  var setupSubmitElement = document.querySelector('.setup-submit');
  var setupUserNameElement = document.querySelector('.setup-user-name');

  var wizardCoatColor = '#6589a4';
  var wizardEyesColor = 'black';
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardEyesColor) {
      rank += 1;
    }

    return rank;
  };

  var similarWizzardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var submitLoadSetupWizardFormHandeler = function () {
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

  var renderWizards = function () {
    similarListElement.innerHTML = '';

    var showWizards = wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    });

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      var wizzardElement = similarWizzardTemplate.cloneNode(true);

      wizzardElement.querySelector('.setup-similar-label').textContent = showWizards[i].name;
      wizzardElement.querySelector('.wizard-coat').style.fill = showWizards[i].colorCoat;
      wizzardElement.querySelector('.wizard-eyes').style.fill = showWizards[i].colorEyes;

      fragment.appendChild(wizzardElement);
    }

    similarListElement.appendChild(fragment);
  };

  var loadGetWizardsHandler = function (response) {
    wizards = response;

    renderWizards();
  };

  var errorGetWizardsHandler = function (message) {
    window.error.show(message);
  };

  var showWizards = function () {
    window.backend.load(loadGetWizardsHandler, errorGetWizardsHandler);
  };

  showWizards();

  document.querySelector('.setup-similar').classList.remove('hidden');

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
    window.util.isEnterEvent(evt, function (evtEnter) {
      openSetupPopup(evtEnter);
    });
  });

  setupCloseElement.addEventListener('click', function () {
    closeSetupPopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      closeSetupPopup();
    });
  });

  setupSubmitElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      submitSetupPopup();
    });
  });

  window.util.initializationMove(userDialog, document.querySelector('.upload'));

  var changeElementColor = function (input, element, property, colors) {
    return window.debounce(function () {
      var color = window.util.getRandomElementArray(colors);

      input.value = color;
      element.style[property] = color;

      // Сохраняем измененные цвета
      saveWizzardColors();

      // Отображаем похожих волшебников
      renderWizards();
    });
  };

  // Изменение цвета мантии персонажа по нажатию
  var wizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
  var wizardCoatInputElement = document.querySelector('.setup input[name=coat-color]');
  wizardCoatElement.style.fill = wizardCoatColor;
  wizardCoatElement.addEventListener('click', changeElementColor(wizardCoatInputElement, wizardCoatElement, 'fill', SETUP_COAT_COLORS));


  // Изменение цвета глаз персонажа по нажатию
  var wizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesInputElement = document.querySelector('.setup input[name=eyes-color]');
  wizardEyesElement.style.fill = wizardEyesColor;
  wizardEyesElement.addEventListener('click', changeElementColor(wizardEyesInputElement, wizardEyesElement, 'fill', SETUP_EYES_COLOR));

  // Изменение цвета фаерболов по нажатию
  var wizardFireballElement = document.querySelector('.setup-fireball-wrap');
  var wizardFireballInputElement = document.querySelector('.setup input[name=fireball-color]');

  wizardFireballElement.addEventListener('click', changeElementColor(wizardFireballInputElement, wizardFireballElement, 'backgroundColor', SETUP_FIREBALL_COLOR));

  var saveWizzardColors = function () {
    wizardCoatColor = wizardCoatElement.style.fill;
    wizardEyesColor = wizardEyesElement.style.fill;
  };
})();
