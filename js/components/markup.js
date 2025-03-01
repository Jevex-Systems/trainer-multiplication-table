import refs from './refs.js';
import { set, board } from './settings.js';
import { classAdd, classRemove } from './classChange.js';
import { makeBoard } from './leaderBoard.js';
import { addActiveClass } from './mode.js';
import { formatTime } from './timer.js';

export function markup() {
  if (set.menu === 'main') {
    classAdd(refs.box.main);
    classAdd(refs.box.board);
    classRemove(refs.box.menu);
    classRemove(refs.box.app);
  } else if (set.menu === 'board') {
    classAdd(refs.box.app);
    classAdd(refs.box.main);
    classRemove(refs.box.menu);
    classRemove(refs.box.board);
    makeBoard();
  }
  addActiveClass(refs.menu, set.menu);
  addActiveClass(refs.lang, set.lang);
  addActiveClass(refs.mode, set.mode);
}
export function makeTranslate(translate, refs, lang, prefix = '') {
  const path = translate[lang];
  if (!path) {
    return;
  }

  for (let key in path) {
    const value = path[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      makeTranslate({ [lang]: value }, refs, lang, newKey);
    } else {
      let ref = refs;
      const keyParts = newKey.split('.');
      for (let part of keyParts) {
        ref = ref[part];
        if (!ref) break;
      }

      if (ref) {
        if (value.includes('<') && value.includes('>')) {
          ref.innerHTML = value;
        } else {
          ref.textContent = value;
        }
      }
    }
  }
}

export function makeModal() {
  classRemove(refs.modal.window);
  let time = formatTime();
  let result = board.right.length + board.wrong.length;
  let markUp = `
   <li class="modal__item">
                <p class="modal__data" data-modal="time" >Time</p>
                <p class="modal__data" data-modal="score" >Score</p>
                <p class="modal__data" data-modal="right" >Right Answer</p>
                <p class="modal__data" data-modal="wrong" >Wrong Answer</p>
              </li>
              <li class="modal__item">
                <p class="modal__data">${time}</p>
                <p class="modal__data">${result}</p>
                <p class="modal__data">${board.right.length}</p>
                <p class="modal__data">${board.wrong.length}</p>
              </li>`;
  refs.modal.markup.innerHTML = markUp;
  makeTranslate(translate, refs, set.lang);
}
