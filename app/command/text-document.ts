import { IDocument } from "./interface";

export class TextDocument implements IDocument {
  private content: string = '';

  setContent(content: string): void {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }
}
