// Player class without memento pattern
export class BadPlayer {
  public health: number = 100;
  public level: number = 0;
  public isDead: boolean = false;
  public name: string = 'Hero';
}

function getPlayerInfo(player: BadPlayer): string {
  const status = player.isDead ? 'Dead' : 'Alive';
  return `Player: ${player.name} | Status: ${status} | Level: ${player.level} | Health: ${player.health}`;
}

// ===== Demo starts here =====
const player = new BadPlayer();

console.log(' Starting game:');
console.log(getPlayerInfo(player));

// Manually save state
console.log('Playing and manually saving...');
player.level += 1;
const savedState = {
  health: player.health,
  level: player.level,
  isDead: player.isDead,
  name: player.name
};
console.log(getPlayerInfo(player));

// Continue playing
console.log('Continue playing...');
player.level += 1;
player.health = 50;
console.log(getPlayerInfo(player));

// Player dies
console.log('Player died!');
player.isDead = true;
player.health = 0;
console.log(getPlayerInfo(player));

// Manual restore
console.log('Manually restoring...');
player.health = savedState.health;
player.level = savedState.level;
player.isDead = savedState.isDead;
console.log(getPlayerInfo(player));

/*
 Problems with this approach:
  - Manual copying is error-prone
  - No encapsulation (all fields public)
  - Hard to manage multiple saves
  - Easy to forget properties
  */