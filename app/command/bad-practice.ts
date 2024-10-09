import { TextEditor } from "./bad-practice-editor";

const editor = new TextEditor();

// Set initial content
editor.setContent("Hello World");
console.log(editor.getContent());  // Output: "Hello World"

// Bold "World"
editor.bold(6, 5);
console.log(editor.getContent());  // Output: "Hello **World**"

editor.undo();
console.log(editor.getContent());  // Output: "Hello World"


