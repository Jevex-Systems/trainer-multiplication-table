import refs from './components/refs.js';
import translate from './components/translate.js';
import { set, board, resetSettings } from './components/settings.js';
import { setLocal, loadUserSettings } from './components/localStorage.js';
import { markup, makeTranslate } from './components/markup.js';
import { resetBoard } from './components/settings.js';
import { applySettings, setStandartSettings } from './components/mode.js';
import {
  applyTimerSetting,
  makeRightTime,
  resetTimer,
  startTimer,
} from './components/timer.js';
import { product, startExercise } from './components/exercise.js';
import { classAdd } from './components/classChange.js';
import { openTutor } from './components/tutorial.js';

loadUserSettings(refs.LOCAL_KEY, set);
loadUserSettings(refs.BOARD_KEY, board.markup);
makeTranslate(translate, refs, set.lang);
setStandartSettings();
markup();

document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener('input', function (event) {
    let value = event.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  });
});

refs.box.lang.addEventListener('click', (event) => {
  if (event.target.dataset.lang) {
    set.lang = event.target.dataset.lang;
    makeTranslate(translate, refs, set.lang);
    setLocal(refs.LOCAL_KEY, set);
    resetTimer();
    markup();
  }
});

refs.main.start.addEventListener('click', (event) => {
  set.menu = 'main';
  setLocal(refs.LOCAL_KEY, set);
  markup();
  setStandartSettings();
  openTutor();
});

refs.tutor.next.addEventListener('click', (event) => {
  openTutor();
});

refs.settings.reset.addEventListener('click', (event) => {
  resetSettings();
  location.reload();
});

refs.box.menu.addEventListener('click', (event) => {
  if (event.target.dataset.menu) {
    set.menu = event.target.dataset.menu;
    setLocal(refs.LOCAL_KEY, set);
    markup();
    setStandartSettings();
  }
});

refs.box.app.addEventListener('click', (event) => {
  if (event.target.dataset.mode) {
    set.mode = event.target.dataset.mode;
    setStandartSettings();
  } else if (event.target.dataset.modeMultiplicand) {
    set.multiplicand = event.target.dataset.modeMultiplicand;
    applySettings();
  } else if (event.target.dataset.modeSubmultiplicand) {
    set.subMultiplicand = event.target.dataset.modeSubmultiplicand;
  } else if (event.target.dataset.modeMultiplier) {
    set.multiplier = event.target.dataset.modeMultiplier;
    applySettings();
  } else if (event.target.dataset.modeSubmultiplier) {
    set.subMultiplier = event.target.dataset.modeSubmultiplier;
  }
  setLocal(refs.LOCAL_KEY, set);
  markup();
});

refs.box.timer.addEventListener('click', applyTimerSetting);

refs.timer.input.addEventListener('input', (event) => {
  if (event.target.value) {
    refs.timer.set.disabled = false;
  } else {
    refs.timer.set.disabled = true;
  }
  event.target.selectionStart = event.target.selectionEnd =
    event.target.value.length;

  makeRightTime();
});

refs.timer.input.addEventListener('click', (event) => {
  event.target.setSelectionRange(
    event.target.value.length,
    event.target.value.length
  );
});

refs.timer.input.addEventListener('keydown', (event) => {
  setTimeout(() => {
    event.target.setSelectionRange(
      event.target.value.length,
      event.target.value.length
    );
  });
});

refs.timer.input.addEventListener('select', (event) => {
  event.preventDefault();
  event.target.setSelectionRange(
    event.target.value.length,
    event.target.value.length
  );
});

refs.exercise.product.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    startExercise();
  }
});

refs.exercise.next.addEventListener('click', startExercise);

refs.exercise.answer.addEventListener('click', product);

refs.modal.button.addEventListener('click', (event) => {
  classAdd(refs.modal.window);
});

refs.board.reset.addEventListener('click', resetBoard);
