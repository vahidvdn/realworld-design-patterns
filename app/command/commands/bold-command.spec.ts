import { TextDocument } from "../text-document";
import { BoldCommand } from "./bold-command";

describe('BoldCommand', () => {
  it('should bold text', () => {
    const document = new TextDocument();
    document.setContent('Hello, World!');
    const boldCommand = new BoldCommand(document, 7, 9);
    boldCommand.execute();
    expect(document.getContent()).toBe('Hello, **Wo**rld!');
  })

  it('should undo bold text', () => {
    const document = new TextDocument();
    document.setContent('Hello, World!');
    const boldCommand = new BoldCommand(document, 7, 9);
    boldCommand.execute();
    boldCommand.undo();
    expect(document.getContent()).toBe('Hello, World!');
  })

  it('should undo bold text', () => {
    const document = new TextDocument();
    document.setContent('Hello, World!');
    const boldCommand = new BoldCommand(document, 7, 5);
    expect(() => boldCommand.execute()).toThrow(/Invalid range/);
  })
});
