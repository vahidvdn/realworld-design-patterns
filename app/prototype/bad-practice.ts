/**
 * Bad Practice Example for Prototype Pattern
 * 
 * This example shows the inefficient way of creating similar documents
 * by recreating them from scratch each time instead of using the prototype pattern.
 */

// Simple Document class without prototype pattern
class BadDocument {
  title: string;
  content: string;
  metadata: {
    author: string;
    created: Date;
    watermark?: string;
  };

  constructor(title: string, content: string, author: string, watermark?: string) {
    this.title = title;
    this.content = content;
    this.metadata = {
      author: author,
      created: new Date(),
      watermark: watermark
    };
  }

  print(): void {
    console.log(`Printing document: ${this.title}`);
  }
}

// Creating multiple similar documents from scratch
// For each document, we have to recreate the entire structure
const invoiceTemplate = new BadDocument(
  "Invoice Template",
  "This is a standard invoice template with company logo.",
  "System",
  "Company Confidential"
);

// To create a new invoice based on the template, we have to manually copy all properties
const invoice1 = new BadDocument(
  "Invoice #1001",
  invoiceTemplate.content,
  "Alice",
  invoiceTemplate.metadata.watermark
);

const invoice2 = new BadDocument(
  "Invoice #1002",
  invoiceTemplate.content,
  "Bob",
  invoiceTemplate.metadata.watermark
);

// For a different document type, we again create from scratch
const report1 = new BadDocument(
  "Q1 Financial Report",
  "Financial results for Q1 2025...",
  "Finance Team",
  "Internal Use Only"
);

// Display results
console.log("Invoice Template:", invoiceTemplate);
console.log("\nInvoice #1:", invoice1);
console.log("\nInvoice #2:", invoice2);
console.log("\nReport #1:", report1);

// Problems with this approach:
// 1. Repetitive code for creating similar objects
// 2. No built-in way to clone objects
// 3. Manual property copying is error-prone
// 4. Changes to document structure require updates in multiple places
// 5. No guarantee that all properties are copied correctly
