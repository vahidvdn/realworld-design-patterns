import { Prototype } from "./interface";


// Complex object (Document)
class Document implements Prototype<Document> {
  constructor(
    public title: string,
    public content: string,
    public metadata: { author: string; created: Date; watermark?: string }
  ) {}

  clone(): Document {
    // Deep copy: metadata also cloned
    return new Document(
      this.title,
      this.content,
      { ...this.metadata, created: new Date(this.metadata.created) }
    );
  }
}

export { Prototype, Document };
