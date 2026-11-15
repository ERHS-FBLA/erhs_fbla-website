// Community service hours leaderboard (CSevents.html)
import { renderLeaderboard } from './lib/leaderboard.js';

window.addEventListener('load', () => renderLeaderboard({
  sheetId: '10m2nmbbruES_Femj-myVdpo_pfH0fzlZP15ILy775b4',
  nameField: 'First and Last Name',
  scoreField: 'Hours',
  scoreLabel: 'Hours',
}));
