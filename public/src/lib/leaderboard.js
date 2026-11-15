// Renders a ranked leaderboard from a Google Sheet that is synced into the Realtime Database
// at /<sheetId>/Sheet1/<row>/<column>. Rows start at 1; rows with an empty name or score are skipped.
import { ref, get, child } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js';
import { db } from './firebase.js';

function el(tag, style, text) {
  const node = document.createElement(tag);
  if (style) node.setAttribute('style', style);
  if (text !== undefined) node.textContent = text; // textContent, never innerHTML: DB values are untrusted
  return node;
}

function header(scoreLabel) {
  const container = el('div', 'margin-left: 10%; margin-right: 15%; font-weight: bold');
  const left = el('div', 'float: left');
  left.append(
    el('p', 'display: inline; padding-right: 65px; color: black; margin-bottom: 20px !important;', 'Rank'),
    el('p', 'display: inline; color: black; margin-bottom: 20px !important;', 'Name'),
  );
  const right = el('div', 'text-align: right;');
  right.append(el('p', 'color: black; margin-bottom: 20px !important;', scoreLabel));
  container.append(left, right);
  return container;
}

function row(rank, name, score) {
  const container = el('div', 'outline: 1px solid grey; margin-left: 10%;  outline-offset: 10px; margin-right: 15%; border-radius: 1px');
  const left = el('div', 'float: left');
  left.append(
    el('p', 'display: inline; padding-right: 100px; color: black; margin-bottom: 40px !important;', String(rank)),
    el('p', 'display: inline; color: black; margin-bottom: 40px !important;', name),
  );
  const right = el('div', 'text-align: right;');
  right.append(el('p', 'color: black; margin-bottom: 40px !important;', String(Math.floor(score))));
  container.append(left, right);
  return container;
}

/**
 * @param {object} opts
 * @param {string} opts.sheetId     Google Sheet ID used as the top-level DB key
 * @param {string} opts.nameField   Column holding the person's name
 * @param {string} opts.scoreField  Column holding the score (points, hours, ...)
 * @param {string} opts.scoreLabel  Header text for the score column
 */
export async function renderLeaderboard({ sheetId, nameField, scoreField, scoreLabel }) {
  const leaderboard = document.createElement('div');
  leaderboard.id = 'leaderboard';
  document.body.appendChild(leaderboard);

  try {
    const snapshot = await get(child(ref(db), `${sheetId}/Sheet1`));
    if (!snapshot.exists()) {
      console.log('No data available');
      return;
    }

    // One read for the whole sheet; keep each name paired with its own score.
    const entries = [];
    for (let i = 1; i <= snapshot.size; i++) {
      const name = snapshot.child(`${i}/${nameField}`).val();
      const score = snapshot.child(`${i}/${scoreField}`).val();
      if (name && score !== null && score !== '') entries.push({ name, score });
    }

    const list = el('div', 'overflow-y: scroll; height: 500px; width: 80%; margin-left: 10%;');
    list.setAttribute('class', 'tabs_content');
    list.setAttribute('data-tab', '2');
    list.append(header(scoreLabel));
    entries.forEach((entry, idx) => list.append(row(idx + 1, entry.name, entry.score)));

    document.getElementById('content').append(list);
  } catch (error) {
    console.error(error);
  }
}
