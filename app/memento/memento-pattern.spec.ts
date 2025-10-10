import { PlayerState } from "./game-originator";
import { SaveManager } from "./game-caretaker";

describe('Memento Pattern', () => {
  let player: PlayerState;
  let saveManager: SaveManager;

  beforeEach(() => {
    player = new PlayerState(100, 1, false, 'Hero');
    saveManager = new SaveManager();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

    it('should throw error when health is out of range', () => {
      expect(() => {
        new PlayerState(-10, 1, false, 'Hero');
      }).toThrow('Health must be between 0 and 100');

      expect(() => {
        new PlayerState(150, 1, false, 'Hero');
      }).toThrow('Health must be between 0 and 100');
  });
  it('should save player state', () => {
    const memento = player.save();
    expect(memento).toBeDefined();
    expect(memento.getState()).toEqual({
      name: 'Hero',
      health: 100,
      level: 1,
      isDead: false
    });
  });
  
  it('should restore player state', () => {
    player.levelUp();
    const memento = player.save();
    player.die();
    expect(player.getInfo()).toContain('Dead');
    player.restore(memento);
    expect(player.getInfo()).toContain('Alive');
    expect(player.getInfo()).toContain('Level: 2');
  });

  it('should save to slot', () => {
    const memento = player.save();
    saveManager.saveToSlot('testSlot', memento);
    const loaded = saveManager.loadFromSlot('testSlot');
    expect(loaded).toBeDefined();
  });


  it('should throw an error when slot not found', () => {
    expect(() => {
      saveManager.loadFromSlot('notExisted');
    }).toThrow('Save slot not found');  
  });

  it('should restore player to alive state from dead state', () => {
    player.levelUp();
    saveManager.saveToSlot('beforeDeath', player.save());
    player.die();

    expect(player.getInfo()).toContain('Dead');

    const memento = saveManager.loadFromSlot('beforeDeath');
    player.restore(memento);

    expect(player.getInfo()).toContain('Alive');
    expect(player.getInfo()).toContain('Level: 2');
  });

  it('should handle multiple save slots', () => {
    player.levelUp();
    saveManager.saveToSlot('slotFirst', player.save());
    
    player.levelUp();
    saveManager.saveToSlot('slotSecond', player.save());

    const slotFirst = saveManager.loadFromSlot('slotFirst');
    player.restore(slotFirst);
    expect(player.getInfo()).toContain('Level: 2');

    const slotSecond = saveManager.loadFromSlot('slotSecond');
    player.restore(slotSecond);
    expect(player.getInfo()).toContain('Level: 3');
  });
});