/**
 * Task: Implement save/load system for player state
 * with checkpoint and restore functionality
 */

import { PlayerState } from './game-originator';
import { SaveManager } from './game-caretaker';

//creating an instance of originator: health | level | isDead | name
const player = new PlayerState(100, 1, false, 'Hero');
const saveManager = new SaveManager();

console.log('Starting game');
console.log(player.getInfo());

player.levelUp();
saveManager.saveToSlot('beforeBattle',player.save());
console.log(player.getInfo());

console.log('Continue playing and leveling up');
player.levelUp();
saveManager.saveToSlot('cityZone', player.save());
console.log(player.getInfo());

// Player died
player.die();
console.log(player.getInfo());

// Restoring from save: beforeBattle
player.restore(saveManager.loadFromSlot('beforeBattle'));
console.log(player.getInfo());