import { IMemento } from './interface';

export class SaveManager {
  private saveSlots: Map<string, IMemento> = new Map();

  public saveToSlot(slotName: string, memento: IMemento): void {
    this.saveSlots.set(slotName, memento);
  }

  public loadFromSlot(slotName: string): IMemento {
    const memento = this.saveSlots.get(slotName);
    if (!memento) {
      throw new Error('Save slot not found');
    }
    console.log(`Loaded from slot: ${slotName}`);
    return memento;
  }
}
