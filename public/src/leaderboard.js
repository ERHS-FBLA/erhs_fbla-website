// Competitive points leaderboard (leaderboard.html)
import { renderLeaderboard } from './lib/leaderboard.js';

window.addEventListener('load', () => renderLeaderboard({
  sheetId: '1rSWiDsligRQFN25PMePdPlImUC1ZnpEo_W0VGerpXoU',
  nameField: 'Name',
  scoreField: 'Points',
  scoreLabel: 'Points',
}));
