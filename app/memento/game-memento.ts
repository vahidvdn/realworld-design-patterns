import { Player,IMemento } from "./interface";

export class PlayerMemento implements IMemento{
 private readonly gameState:string;

 constructor(state:Player){
  this.gameState = JSON.stringify(state)
 }

public getState(): Player {
    return JSON.parse(this.gameState);
}

}