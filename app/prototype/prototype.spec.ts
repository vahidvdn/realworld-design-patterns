import { Document } from './document-prototype';

describe('Prototype Pattern', () => {
  describe('Document', () => {
    it('should create a document with the provided properties', () => {
      const metadata = {
        author: 'Test Author',
        created: new Date(2025, 0, 1),
        watermark: 'Test Watermark'
      };

      const doc = new Document('Test Title', 'Test Content', metadata);

      expect(doc.title).toBe('Test Title');
      expect(doc.content).toBe('Test Content');
      expect(doc.metadata).toEqual(metadata);
    });

    it('should clone a document with all properties', () => {
      const originalDate = new Date(2025, 0, 1);
      const metadata = {
        author: 'Original Author',
        created: originalDate,
        watermark: 'Original Watermark'
      };

      const original = new Document('Original Title', 'Original Content', metadata);
      const clone = original.clone();

      // Check that all properties were copied
      expect(clone.title).toBe('Original Title');
      expect(clone.content).toBe('Original Content');
      expect(clone.metadata.author).toBe('Original Author');
      expect(clone.metadata.watermark).toBe('Original Watermark');

      // Check that dates are equal but not the same reference
      expect(clone.metadata.created.getTime()).toBe(originalDate.getTime());
      expect(clone.metadata.created).not.toBe(originalDate);

      // Verify deep copy by changing clone and checking original is unchanged
      clone.title = 'Modified Title';
      clone.metadata.author = 'Modified Author';

      expect(original.title).toBe('Original Title');
      expect(original.metadata.author).toBe('Original Author');
    });

    it('should allow modifying cloned documents independently', () => {
      const template = new Document(
        'Template',
        'Original Content',
        { author: 'System', created: new Date() }
      );

      const doc1 = template.clone();
      doc1.title = 'Document 1';
      doc1.content = 'Modified Content 1';

      const doc2 = template.clone();
      doc2.title = 'Document 2';
      doc2.content = 'Modified Content 2';

      // Original template should be unchanged
      expect(template.title).toBe('Template');
      expect(template.content).toBe('Original Content');

      // Each clone should have its own values
      expect(doc1.title).toBe('Document 1');
      expect(doc1.content).toBe('Modified Content 1');
      expect(doc2.title).toBe('Document 2');
      expect(doc2.content).toBe('Modified Content 2');
    });
  });
});
