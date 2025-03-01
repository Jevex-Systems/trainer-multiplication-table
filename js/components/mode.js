import refs from './refs.js';
import { set, resetSettings, resetBoard } from './settings.js';
import { setLocal } from './localStorage.js';
import { classAdd, classRemove } from './classChange.js';
import { resetTimer } from './timer.js';
import { resetFactors } from './exercise.js';

export function addActiveClass(obj, settings) {
  for (let key in obj) {
    key === settings
      ? classAdd(obj[key], 'active')
      : classRemove(obj[key], 'active');
  }
}

export function setStandartSettings() {
  resetTimer();
  resetFactors();
  set.switch = 'off';

  refs.exercise.factorOne.placeholder = '1';
  refs.exercise.factorTwo.placeholder = '1';
  refs.exercise.factorOne.value = '';
  refs.exercise.factorTwo.value = '';

  refs.settings.multiplicand.round.checked = false;
  refs.settings.multiplicand.random.checked = false;
  refs.settings.multiplicand.round.disabled = true;
  refs.settings.multiplicand.random.disabled = true;
  refs.settings.multiplicandRandomSub.one.disabled = true;
  refs.settings.multiplicandRandomSub.two.disabled = true;

  refs.settings.multiplier.round.checked = false;
  refs.settings.multiplier.random.checked = false;
  refs.settings.multiplier.round.disabled = true;
  refs.settings.multiplier.random.disabled = true;
  refs.settings.multiplierRandomSub.one.disabled = true;
  refs.settings.multiplierRandomSub.two.disabled = true;

  refs.exercise.next.disabled = false;
  refs.exercise.product.disabled = false;
  refs.exercise.factorOne.disabled = true;
  refs.exercise.factorTwo.disabled = true;
  refs.exercise.product.value = '';
  refs.exercise.answer.disabled = true;
  classRemove(refs.exercise.imgCheck);
  classAdd(refs.exercise.imgCross);
  classAdd(refs.exercise.imgQuestion);

  refs.timer.set.disabled = true;
  refs.timer.switch.disabled = true;
  refs.timer.input.disabled = true;

  if (set.mode === 'auto') {
    refs.settings.multiplicand.round.disabled = false;
    refs.settings.multiplicand.random.disabled = false;
    refs.settings.multiplicand.round.checked = true;

    refs.settings.multiplier.round.disabled = false;
    refs.settings.multiplier.random.disabled = false;
    refs.settings.multiplier.round.checked = true;

    refs.exercise.next.disabled = false;
    refs.exercise.product.disabled = false;
    refs.exercise.factorOne.disabled = true;
    refs.exercise.factorTwo.disabled = true;

    refs.timer.switch.disabled = false;
    refs.timer.input.disabled = true;
  } else if (set.mode === 'manual') {
    refs.exercise.factorOne.disabled = false;
    refs.exercise.factorOne.value = 1;
    refs.exercise.factorOne.placeholder = '';
    refs.exercise.factorTwo.disabled = false;
    refs.exercise.factorTwo.value = 1;
    refs.exercise.factorTwo.placeholder = '';
    refs.exercise.answer.disabled = false;
    classAdd(refs.exercise.imgCheck);
    classAdd(refs.exercise.imgCross);
    classRemove(refs.exercise.imgQuestion);
  }
  setLocal(refs.LOCAL_KEY, set);
}

export function applySettings() {
  if (set.multiplicand === 'random') {
    refs.settings.multiplicandRandomSub.one.disabled = false;
    refs.settings.multiplicandRandomSub.two.disabled = false;
  } else if (set.multiplier === 'round') {
    refs.settings.multiplicandRandomSub.one.disabled = true;
    refs.settings.multiplicandRandomSub.two.disabled = true;
  }
  if (set.multiplier === 'random') {
    refs.settings.multiplierRandomSub.one.disabled = false;
    refs.settings.multiplierRandomSub.two.disabled = false;
  } else if (set.multiplier === 'round') {
    refs.settings.multiplierRandomSub.one.disabled = true;
    refs.settings.multiplierRandomSub.two.disabled = true;
  }
}
