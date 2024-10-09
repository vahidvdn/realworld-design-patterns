import { ICommand, IDocument } from "../interface";

export class EraseCommand implements ICommand {
  private document: IDocument;
  private eraseCount: number;
  private remainingPart: string = '';

  constructor(document: IDocument, eraseCount: number) {
    this.document = document;
    this.eraseCount = eraseCount;
  }

  execute(): void {
    let doc = this.document.getContent();
    const newDoc = doc.slice(0, -this.eraseCount);
    this.remainingPart = doc.slice(doc.length-this.eraseCount);
    this.document.setContent(newDoc);
  }

  undo(): void {
    let doc = this.document.getContent();
    doc += this.remainingPart;
    this.document.setContent(doc);
  }
}
