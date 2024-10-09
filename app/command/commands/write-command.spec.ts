import { TextDocument } from "../text-document";
import { WriteCommand } from "./write-command";

describe('WriteCommand', () => {
  it('should write text', () => {
    const document = new TextDocument();
    const writeCommand = new WriteCommand(document, 'test');
    writeCommand.execute();
    expect(document.getContent()).toBe('test');
  })

  it('should undo write text', () => {
    const document = new TextDocument();
    const writeCommand = new WriteCommand(document, 'hello');
    writeCommand.execute();
    writeCommand.undo();
    expect(document.getContent()).toBe('');
  })
});
