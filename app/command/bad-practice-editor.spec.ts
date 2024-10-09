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

  it('should do nothing if there is nothing to undo', () => {
    const editor = new TextEditor();
    editor.setContent("Hello World");
    editor.undo();
    expect(editor.getContent()).toBe("Hello World");
  })

  it('should make the text italic', () => {
    const editor = new TextEditor();
    editor.setContent("Hello World");
    editor.italic(6, 5);
    // add implementation here
  })
});
