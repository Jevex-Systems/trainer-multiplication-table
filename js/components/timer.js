import refs from './refs.js';
import { set } from './settings.js';
import { board } from './settings.js';
import { setLocal } from './localStorage.js';
import translate from './translate.js';
import { getResult } from './leaderBoard.js';
import { makeModal, markup } from './markup.js';
import { resetFactors } from './exercise.js';

export function formatTime() {
  const timeInMs = Date.now() - board.time;
  const totalSeconds = Math.floor(timeInMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
}

export function makeRightTime() {
  const value = refs.timer.input.value || '0000';
  const formattedValue = String(value).padStart(4, '0');

  const minutes = Math.min(
    Math.max(parseInt(formattedValue.slice(0, 2)), 0),
    59
  );
  const seconds = Math.min(Math.max(parseInt(formattedValue.slice(2)), 0), 59);

  refs.timer.min.textContent = String(minutes).padStart(2, '0');
  refs.timer.sec.textContent = String(seconds).padStart(2, '0');
}

export function startTimer() {
  if (set.timer) {
    clearInterval(set.timer);
    set.timer = null;
  }
  if (!board.time) {
    board.time = Date.now();
  }
  refs.exercise.next.disabled = false;
  refs.exercise.product.disabled = false;
  refs.exercise.product.focus();

  let seconds = parseInt(refs.timer.sec.textContent) || 0;
  let minutes = parseInt(refs.timer.min.textContent) || 0;

  if (isNaN(minutes) || isNaN(seconds)) {
    console.error("Timer's weightless values");
    return;
  }

  refs.timer.input.value = '';
  refs.timer.input.disabled = true;
  refs.timer.set.disabled = false;

  set.timer = setInterval(() => {
    if (seconds === 0 && minutes === 0) {
      resetTimer();
      makeModal();
      board.right = [];
      board.wrong = [];
      board.time = '';
      setLocal(refs.LOCAL_KEY, set);
      setLocal(refs.BOARD_KEY, board.markup);
      setLocal(refs.LOCAL_KEY, set);
      return;
    }

    if (seconds === 0) {
      if (minutes > 0) {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }

    refs.timer.sec.textContent = String(seconds).padStart(2, '0');
    refs.timer.min.textContent = String(minutes).padStart(2, '0');
    setLocal(refs.LOCAL_KEY, set);
  }, 1000);
}

export function startChallengge() {
  if (set.timer) {
    return;
  } else if (!set.timer) {
    refs.timer.sec.textContent = set.challengeTimer[1].padStart(2, '0');
    refs.timer.min.textContent = set.challengeTimer[0].padStart(2, '0');
    let ss = parseFloat(refs.timer.sec.textContent);
    set.timer = setInterval(() => {
      if (ss === 0) {
        clearInterval(set.timer);
        set.timer = null;
        setLocal(refs.LOCAL_KEY, set);
        getResult();
        return;
      }

      ss--;
      refs.timer.sec.textContent = String(ss).padStart(2, '0');
    }, 1000);
  }
}

export function applyTimerSetting(event) {
  if (!event.target.dataset.timer) return;

  const action = event.target.dataset.timer;

  switch (action) {
    case 'switch':
      set.switch = set.switch === 'on' ? 'off' : 'on';
      if (set.timer) {
        resetTimer();
      }
      if (set.switch === 'off') {
        refs.exercise.product.disabled = false;
        refs.exercise.next.disabled = false;

        refs.timer.switch.textContent =
          set.lang === 'en' ? 'Enable the timer' : 'Активувати таймер';
        makeRightTime();
        refs.timer.input.disabled = true;
        refs.timer.set.disabled = true;
        refs.timer.input.value = '';
        set.timerSet = 'off';
      } else {
        refs.exercise.next.disabled = true;
        refs.exercise.product.disabled = true;
        refs.timer.input.disabled = false;
        refs.timer.switch.textContent =
          set.lang === 'en' ? 'Disable the timer' : 'Вимкнути таймер';
      }
      break;

    case 'set':
      set.timerSet = set.timerSet === 'off' ? 'on' : 'off';
      if (set.timerSet === 'on' && set.switch === 'on') {
        resetFactors();
        startTimer();
      } else {
        resetTimer();
      }
      if (set.timerSet === 'on') {
        refs.timer.set.textContent = set.lang === 'en' ? 'Stop' : 'Зупинити';
      } else if (set.timerSet === 'off') {
        refs.timer.set.textContent = set.lang === 'en' ? 'Set!' : 'Встановити!';
      }
      break;
  }

  setLocal(refs.LOCAL_KEY, set);
}

export function resetTimer() {
  if (set.timer) {
    clearInterval(set.timer);
    set.timer = null;
  }
  refs.exercise.product.disabled = true;

  set.timerSet = 'off';
  refs.timer.sec.textContent = '00';
  refs.timer.min.textContent = '00';
  refs.timer.input.value = '';
  refs.timer.input.disabled =
    set.mode === 'challenge' ? true : set.mode === 'manual' ? true : false;
  refs.timer.set.disabled = true;
  if (set.timerSet === 'on') {
    refs.timer.set.textContent = set.lang === 'en' ? 'Stop' : 'Зупинити';
  } else if (set.timerSet === 'off') {
    refs.timer.set.textContent = set.lang === 'en' ? 'Set!' : 'Встановити!';
  }
  setLocal(refs.LOCAL_KEY, set);
}
