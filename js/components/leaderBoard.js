import { setLocal } from './localStorage.js';
import { markup } from './markup.js';
import { set, board } from './settings.js';
import refs from './refs.js';
import { nanoid } from 'https://esm.sh/nanoid';
import { formatTime } from './timer.js';

export function getResult() {
  let time = formatTime();
  let userName = prompt('Please enter your name');
  if (userName === null) {
    board.right = [];
    board.wrong = [];
    board.time = '';
    markup();
    setLocal(refs.LOCAL_KEY, set);
    setLocal(refs.BOARD_KEY, board.markup);
    return;
  }
  const id = nanoid();
  const list = `            <li id="${id}" class="item item__user" data-item='user'>
              <p class="list__name">${userName}</p>
              <p class="list__score">${
                board.right.length + board.wrong.length
              }</p>
              <p class="list__right">${board.right.length} </p>
              <p class="list__wrong">${board.wrong.length} </p>
              <p class="list__time">${time}</p>
            </li>`;
  const arr = [id, list];
  board.markup.push(arr);
  set.menu = 'board';
  board.right = [];
  board.wrong = [];
  board.time = null;
  setLocal(refs.LOCAL_KEY, set);
  setLocal(refs.BOARD_KEY, board.markup);
  makeBoard();
  markup();
}

export function makeBoard() {
  if (board.markup.length === 0) {
    refs.board.list.innerHTML = '';
    return;
  }
  board.markup.forEach((item) => {
    if (!document.getElementById(item[0])) {
      refs.board.list.insertAdjacentHTML('beforeend', item[1]);
    }
  });
}
