import { ICommand, IDocument } from "../interface";

export class BoldCommand implements ICommand {
  private document: IDocument;
  private from: number;
  private to: number;

  constructor(document: IDocument, from: number, to: number) {
    this.document = document;
    this.from = from;
    this.to = to;
  }

  execute(): void {
    if(this.to <= this.from) throw new Error('Invalid range');

    let doc = this.document.getContent();
    doc = doc.slice(0, this.from)
      + "**"
      + doc.slice(this.from, this.to)
      + "**"
      + doc.slice(this.to);
    this.document.setContent(doc);
  }

  undo(): void {
    let doc = this.document.getContent();
    doc = doc.slice(0, this.from)
      + doc.slice(this.from+2, this.to+2)
      + doc.slice(this.to+4);
    this.document.setContent(doc);
  }
}
