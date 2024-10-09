export class TextEditor {
  private content: string = "";
  private undoStack: string[] = [];

  public setContent(content: string): void {
    this.content = content;
    this.undoStack.push(this.content);
  }

  public getContent(): string {
    return this.content;
  }

  public bold(start: number, length: number): void {
    // Save the current content to the undo stack before making changes
    this.undoStack.push(this.content);

    // Apply bold (Markdown style) to the selected text
    const selectedText = this.content.slice(start, start + length);
    const boldedText = `**${selectedText}**`;
    this.content = this.content.slice(0, start) + boldedText + this.content.slice(start + length);
  }

  public italic(start: number, length: number) { /* ... */ }

  // Undo the last operation (revert to the previous state)
  public undo(): void {
    if (this.undoStack.length > 1) {
        this.undoStack.pop();  // Remove the most recent change
        this.content = this.undoStack[this.undoStack.length - 1];  // Restore the previous content
        return;
    }
    console.log("Nothing to undo!");
  }
}
