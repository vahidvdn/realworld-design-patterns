import { ICommand, IDocument } from "../interface";

export class WriteCommand implements ICommand {
  private document: IDocument;
  private text: string;

  constructor(document: IDocument, text: string) {
    this.document = document;
    this.text = text;
  }

  execute(): void {
    let doc = this.document.getContent();
    doc += this.text;
    this.document.setContent(doc);
  }

  undo(): void {
    let doc = this.document.getContent();
    doc = doc.slice(0, -this.text.length);
    this.document.setContent(doc);
  }
}
