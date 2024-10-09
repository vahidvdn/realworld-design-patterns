import { TextDocument } from "./text-document";

describe('TextDocument', () => {
  it('should set content', () => {
    const document = new TextDocument();
    document.setContent('Hello, World!');
    expect(document.getContent()).toBe('Hello, World!');
  })
})
