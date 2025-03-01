import refs from './refs.js';
import { set, board } from './settings.js';
import { setLocal } from './localStorage.js';
import { startChallengge } from './timer.js';
import { classAdd, classRemove } from './classChange.js';

let factorOne = 1;
let factorTwo = 1;

export function resetFactors() {
  factorOne = 1;
  factorTwo = 1;
  refs.exercise.factorOne.placeholder = factorOne;
  refs.exercise.factorTwo.placeholder = factorTwo;
}

export function startExercise() {
  let product = parseFloat(refs.exercise.product.value);

  if (set.mode === 'auto') {
    if (factorOne * factorTwo === product) {
      classRemove(refs.exercise.imgCheck);
      classAdd(refs.exercise.imgCross);
      classAdd(refs.exercise.imgQuestion);

      if (set.timer) {
        board.right.push(product);
      } else {
        board.right = [];
      }
      if (factorOne >= 10) {
        if (factorTwo >= 10) {
          factorTwo = 1;
        } else {
          factorTwo++;
        }
        factorOne = 1;
      } else {
        factorOne++;
      }
    } else {
      classAdd(refs.exercise.imgCheck);
      classRemove(refs.exercise.imgCross);
      classAdd(refs.exercise.imgQuestion);

      if (set.timer) {
        board.wrong.push(product);
      } else {
        board.wrong = [];
      }
    }
    refs.exercise.factorOne.placeholder = factorOne;
    refs.exercise.factorTwo.placeholder = factorTwo;
  } else if (set.mode === 'manual') {
    if (
      refs.exercise.factorOne.value * refs.exercise.factorTwo.value ===
      product
    ) {
      console.log('yes');
    }
  } else if (set.mode === 'challenge') {
    setChallengeSetting();
    if (factorOne * factorTwo === product) {
      classRemove(refs.exercise.imgCheck);
      classAdd(refs.exercise.imgCross);
      classAdd(refs.exercise.imgQuestion);
      if (!board.time) {
        board.time = Date.now();
      }
      clearInterval(set.timer);
      set.timer = null;

      challengeRuleCheck();

      startChallengge();
      if (set.timer) {
        board.right.push(product);
      } else {
        board.right = [];
      }
    } else {
      challengeRuleCheck();
      classAdd(refs.exercise.imgCheck);
      classRemove(refs.exercise.imgCross);
      classAdd(refs.exercise.imgQuestion);

      if (set.timer) {
        board.wrong.push(product);
      } else {
        board.wrong = [];
      }
    }
    refs.exercise.factorOne.placeholder = factorOne;
    refs.exercise.factorTwo.placeholder = factorTwo;
  }
  refs.exercise.product.value = '';
  refs.exercise.product.focus();
  console.log(board.right, board.wrong);
}

let repeat = 1;

export function randomFactor() {
  let factor;
  if (set.multiplicand === 'random' || set.multiplier === 'random') {
    if (set.subMultiplicand === 'two' || set.subMultiplier === 'two') {
      factor = 100;
    } else {
      factor = 10;
    }
  } else {
    return 1;
  }
  let result = Math.floor(Math.random() * factor + 1);

  result = result === repeat ? randomFactor() : result;
  repeat = result;

  return result;
}

export function product() {
  return (refs.exercise.product.value =
    refs.exercise.factorOne.value * refs.exercise.factorTwo.value);
}

function setChallengeSetting() {
  if (set.multiplicand === 'round' && set.multiplier === 'round') {
    refs.settings.multiplicand.round.disabled = false;
    refs.settings.multiplicand.round.checked = true;
    refs.settings.multiplicandRandomSub.one.disabled = true;
    refs.settings.multiplicandRandomSub.two.disabled = true;

    refs.settings.multiplier.round.disabled = false;
    refs.settings.multiplier.round.checked = true;
    refs.settings.multiplierRandomSub.one.disabled = true;
    refs.settings.multiplierRandomSub.two.disabled = true;
  }
  if (set.multiplicand === 'random') {
    refs.settings.multiplicand.round.disabled = true;
    refs.settings.multiplicand.random.disabled = false;
    refs.settings.multiplicand.random.checked = true;
    if (set.subMultiplicand === 'one') {
      refs.settings.multiplicandRandomSub.one.disabled = false;
      refs.settings.multiplicandRandomSub.two.disabled = true;
      refs.settings.multiplicandRandomSub.one.checked = true;
      refs.settings.multiplicandRandomSub.two.checked = false;
    } else {
      refs.settings.multiplicandRandomSub.one.disabled = false;
      refs.settings.multiplicandRandomSub.two.disabled = true;
      refs.settings.multiplicandRandomSub.one.checked = true;
      refs.settings.multiplicandRandomSub.two.checked = false;
    }
  } else if (set.multiplier === 'random') {
    refs.settings.multiplier.round.disabled = true;
    refs.settings.multiplier.random.disabled = false;
    refs.settings.multiplier.random.checked = true;
    if (set.subMultiplier === 'one') {
      refs.settings.multiplierRandomSub.one.disabled = false;
      refs.settings.multiplierRandomSub.two.disabled = true;
      refs.settings.multiplierRandomSub.one.checked = true;
      refs.settings.multiplierRandomSub.two.checked = false;
    } else {
      refs.settings.multiplierRandomSub.one.disabled = false;
      refs.settings.multiplierRandomSub.two.disabled = true;
      refs.settings.multiplierRandomSub.one.checked = true;
      refs.settings.multiplierRandomSub.two.checked = false;
    }
  }
}

function challengeRuleCheck() {
  if (board.right.length > 0 && board.right.length <= 15) {
    set.challengeTimer = ['00', '30'];
    factorTwo = 2;
    set.multiplicand = 'random';
    set.subMultiplicand = 'one';
    factorOne = randomFactor();
  } else if (board.right.length > 15 && board.right.length <= 20) {
    factorTwo = 3;
    factorOne = randomFactor();
  } else if (board.right.length > 20 && board.right.length <= 25) {
    factorTwo = 4;
    factorOne = randomFactor();
  } else if (board.right.length > 25 && board.right.length <= 30) {
    set.challengeTimer = ['00', '20'];
    factorTwo = 5;
    factorOne = randomFactor();
  } else if (board.right.length > 30 && board.right.length <= 35) {
    factorTwo = 6;
    factorOne = randomFactor();
  } else if (board.right.length > 35 && board.right.length <= 40) {
    factorTwo = 7;
    factorOne = randomFactor();
  } else if (board.right.length > 40 && board.right.length <= 45) {
    factorTwo = 8;
    factorOne = randomFactor();
  } else if (board.right.length > 45 && board.right.length <= 50) {
    factorTwo = 9;
    factorOne = randomFactor();
  } else if (board.right.length > 50 && board.right.length <= 60) {
    set.challengeTimer = ['00', '15'];
    set.multiplier = 'random';
    set.subMultiplier = 'one';
    factorOne = randomFactor();
    factorTwo = randomFactor();
  } else if (board.right.length > 60 && board.right.length <= 80) {
    set.subMultiplicand = 'two';
    factorOne = randomFactor();
    factorTwo = randomFactor();
  } else if (board.right.length > 80 && board.right.length <= 99) {
    set.challengeTimer = ['00', '10'];
    set.subMultiplier = 'two';
    factorOne = randomFactor();
    factorTwo = randomFactor();
  } else if (board.right.length === 100) {
    getResult();
  }
}
