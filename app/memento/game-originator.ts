import { PlayerMemento } from './game-memento'; 
import { Player, IMemento } from './interface'; 

export class PlayerState {
  private health: number;
  private level: number;
  private isDead: boolean;
  private name: string;
  private readonly MAX_HEALTH = 100;
  private readonly MIN_HEALTH = 0;

  constructor(health: number, level: number, isDead: boolean, name: string) {
    this.health = this.validateHealth(health);
    this.level = level;
    this.isDead = isDead;
    this.name = name;
  }

  private validateHealth(health: number): number {
    if(health < this.MIN_HEALTH || health > this.MAX_HEALTH){
     throw new Error(`Health must be between ${this.MIN_HEALTH} and ${this.MAX_HEALTH}`);
    }
    return health;
  }
  public getInfo(): string {
    const status = this.isDead ? 'Dead' : 'Alive';
    return `Player: ${this.name} | Status: ${status} | Level: ${this.level} | Health: ${this.health}`;
  }

  public save(): PlayerMemento {
    const state: Player = {
      name: this.name,
      health: this.health,
      level: this.level,
      isDead: this.isDead
    };
    return new PlayerMemento(state);
  }

  public restore(memento: IMemento): void { 
    const state = memento.getState();
    this.name = state.name;
    this.health = state.health;
    this.isDead = state.isDead;
    this.level = state.level;
  }

  public die(): void {
    this.isDead = true;
    this.health = 0;
  }

  public levelUp(): void {
    this.level++;
  }

}