export interface Player{
  health: number;
  level: number;
  isDead: boolean;
  name: string;
}

export interface IMemento{
  getState(): Player;
}

