import { CommandManager } from "./command-manager";
import { BoldCommand, EraseCommand, WriteCommand } from "./commands";
import { TextDocument } from "./text-document";

const document = new TextDocument(); // Receiver
const commandManager = new CommandManager(); // Invoker

// Write some text
const writeCommand1 = new WriteCommand(document, "Hello ");
commandManager.execute(writeCommand1);

const writeCommand2 = new WriteCommand(document, "World.");
commandManager.execute(writeCommand2);

const eraseCommand = new EraseCommand(document, 2);
commandManager.execute(eraseCommand);
console.log(document.getContent()); // Hello Wor

const boldCommand = new BoldCommand(document, 6, 8);
commandManager.execute(boldCommand);
console.log(document.getContent()); // Hello **Wo**rl

commandManager.undo();
console.log(document.getContent()); // Hello Wor

commandManager.undo();
console.log(document.getContent()); // Hello World.

commandManager.undo();
console.log(document.getContent()); // Hello

commandManager.undo();
console.log(document.getContent()); // ''



