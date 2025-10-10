import { BadPlayer } from "./bad-practice";

describe('Memento Pattern bad practice', () => {
  it('should manually save and restore state', () => {
    const player = new BadPlayer();
    player.level = 2;

    const savedState = {
      health: player.health,
      level: player.level,
      isDead: player.isDead,
      name: player.name
    };
    player.isDead = true;
    player.health = 0;

    player.health = savedState.health;
    player.level = savedState.level;
    player.isDead = savedState.isDead;

    expect(player.health).toBe(100);
    expect(player.isDead).toBe(false);
    expect(player.name).toContain('Hero');
  });

  it('should expose all properties publicly', () => {
    const player = new BadPlayer();

    player.health = 50;
    player.level = 5;
    expect(player.level).toBe(5);
    expect(player.health).toBe(50);

  });

  it('should lose state if property is forgotten in save', () => {
    const player = new BadPlayer();
    player.level = 3;
    player.name = 'Enemy';
    const incompleteSave = {
      health: player.health,
      level: player.level,
        isDead: player.isDead
    };
    player.name = 'King';
    player.health = incompleteSave.health;
    player.level = incompleteSave.level;
    player.isDead = incompleteSave.isDead;
    expect(player.name).toBe('King');
  });

  it('should mutate savedState if saved by reference', () => {
    const player = new BadPlayer();
    player.level = 1;
    const savedState = player;
    player.level = 2;
    expect(savedState.level).toBe(2);
  });

  it('should show health wrong when player is dead', () => {
    const player = new BadPlayer();
    player.isDead = true;
    expect(player.health).toBe(100);
  });
  it('should not restore all fields if restoration is incomplete', () => {
    const player = new BadPlayer();
    player.level = 4;
    player.name = 'HeroX';
    const savedState = { ...player };
    player.isDead = true;
    player.health = 0;
    // Forget to restore 'isDead'
    player.health = savedState.health;
    player.level = savedState.level;
    expect(player.isDead).toBe(true);
    expect(player.health).toBe(100);
    expect(player.level).toBe(4);
  });

});
