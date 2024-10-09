import { TextDocument } from "../text-document";
import { EraseCommand } from "./erase-command";

describe('EraseCommand', () => {
  it('should erase', () => {
    const document = new TextDocument();
    document.setContent('Hello, World!');
    const eraseCommand = new EraseCommand(document, 7);
    eraseCommand.execute();
    expect(document.getContent()).toBe('Hello,');
  })

  it('should redo erase', () => {
    const document = new TextDocument();
    document.setContent('Hello, World!');
    const eraseCommand = new EraseCommand(document, 7);
    eraseCommand.execute();
    eraseCommand.undo();
    expect(document.getContent()).toBe('Hello, World!');
  })
});
