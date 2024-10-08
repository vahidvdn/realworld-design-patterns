export interface ICommandManager {
  execute(command: ICommand): void;
  undo(): void;
  redo(): void;
}

export interface ICommand {
  execute(): void;
  undo(): void;
}

export interface IDocument {
  getContent(): string;
  setContent(content: string): void;
}
