import { ICommand, ICommandManager } from "./interface";

export class CommandManager implements ICommandManager {

  private executedCommands: ICommand[] = [];
  private undoneCommands: ICommand[] = [];

  execute(command: ICommand): void {
    command.execute();
    this.executedCommands.push(command);
    this.undoneCommands = []; // Clear the redo stack since we executed a new command
  }

  undo(): void {
    const command = this.executedCommands.pop();
    if (command) {
      command.undo();
      this.undoneCommands.push(command);
    }
  }

  redo(): void {
    const command = this.undoneCommands.pop();
    if (command) {
      command.execute();
      this.executedCommands.push(command);
    }
  }
}
