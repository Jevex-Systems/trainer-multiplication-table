import refs from './refs.js';
import { set } from './settings.js';
import { classAdd, classRemove } from './classChange.js';
import { markup } from './markup.js';
import { setLocal } from './localStorage.js';
import { setStandartSettings } from './mode.js';

export function openTutor() {
  let windows = [
    'zero',
    'first',
    'second',
    'third',
    'four',
    'five',
    'six',
    'seven',
    'eight',
  ];
  if (set.tutor < windows.length) {
    set.menu = 'main';
    markup();
    classRemove(refs.tutor.modal);
    windows.forEach((win) => {
      if (win === windows[set.tutor]) {
        classRemove(refs.tutor[win]);
      } else {
        classAdd(refs.tutor[win]);
      }
    });
    addZindexForElements();
    set.tutor++;
  } else {
    classAdd(refs.tutor.modal);
    windows.forEach((win) => {
      classAdd(refs.tutor[win]);
    });
  }
  setLocal(refs.LOCAL_KEY, set);
}

function addZindexForElements() {
  if (set.tutor === 0) {
    set.mode = 'main';
    markup();
    setStandartSettings();
    classAdd(refs.box.timerParagraphBox, 'up');
  } else if (set.tutor === 1) {
    classRemove(refs.box.timerParagraphBox, 'up');

    classAdd(refs.timer.switch, 'up');
    classAdd(refs.timer.set, 'up');
    refs.timer.set.disabled = false;
  } else if (set.tutor === 2) {
    classRemove(refs.timer.switch, 'up');
    classRemove(refs.timer.set, 'up');
    refs.timer.set.disabled = true;

    refs.exercise.product.disabled = false;
    refs.exercise.next.disabled = false;
    classAdd(refs.exercise.product, 'up');
    classAdd(refs.exercise.next, 'up');
  } else if (set.tutor === 3) {
    refs.exercise.product.disabled = true;
    refs.exercise.next.disabled = true;
    classRemove(refs.exercise.product, 'up');
    classRemove(refs.exercise.next, 'up');

    classAdd(refs.box.settings, 'up');
  } else if (set.tutor === 4) {
    classRemove(refs.box.settings, 'up');

    classAdd(refs.box.menu, 'up');
  } else if (set.tutor === 5) {
    classRemove(refs.box.menu, 'up');

    set.mode = 'manual';
    markup();
    setStandartSettings();
    classAdd(refs.mode.manual, 'up');
    classAdd(refs.exercise.factorOne, 'up');
    classAdd(refs.exercise.factorTwo, 'up');
    classAdd(refs.exercise.answer, 'up');
  } else if (set.tutor === 6) {
    classRemove(refs.mode.manual, 'up');
    classRemove(refs.exercise.factorOne, 'up');
    classRemove(refs.exercise.factorTwo, 'up');
    classRemove(refs.exercise.answer, 'up');

    set.mode = 'challenge';
    markup();
    setStandartSettings();
    classAdd(refs.mode.challenge, 'up');
    classAdd(refs.exercise.product, 'up');
    classAdd(refs.box.timerParagraphBox, 'up');
  } else if (set.tutor === 7) {
    classRemove(refs.exercise.product, 'up');
    classRemove(refs.box.timerParagraphBox, 'up');

    document
      .querySelectorAll('[data-box="settings-radio"]')
      .forEach((box) => classAdd(box, 'up'));
  } else if (set.tutor === 8) {
    classRemove(refs.mode.challenge, 'up');
    document
      .querySelectorAll('[data-box="settings-radio"]')
      .forEach((box) => classRemove(box, 'up'));
    set.mode = 'auto';
    markup();
    setStandartSettings();
  }
}
