import { TextEditor } from "./bad-practice-editor";

describe('BadPracticeEditor', () => {
  it('should make the text bold', () => {
    const editor = new TextEditor();
    editor.setContent("Hello World");
    editor.bold(6, 5);
    expect(editor.getContent()).toBe("Hello **World**");
  })

  it('should undo the text bold', () => {
    const editor = new TextEditor();
    editor.setContent("Hello World");
    editor.bold(6, 5);
    editor.undo();
    expect(editor.getContent()).toBe("Hello World");
  })
});
