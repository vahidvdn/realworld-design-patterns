import { Document } from './document-prototype';

// Create document templates
const invoiceTemplate = new Document(
  "Invoice Template",
  "This is a standard invoice template with company logo.",
  { author: "System", created: new Date(), watermark: "Company Confidential" }
);

const reportTemplate = new Document(
  "Report Template",
  "This is a standard report template with header and footer.",
  { author: "System", created: new Date(), watermark: "Internal Use Only" }
);

// Create new documents by cloning templates
const invoice1 = invoiceTemplate.clone();
invoice1.title = "Invoice #1001";
invoice1.metadata.author = "Alice";
invoice1.metadata.created = new Date();

const invoice2 = invoiceTemplate.clone();
invoice2.title = "Invoice #1002";
invoice2.metadata.author = "Bob";
invoice2.metadata.created = new Date();

const report1 = reportTemplate.clone();
report1.title = "Q1 Financial Report";
report1.content = "Financial results for Q1 2025...";
report1.metadata.author = "Finance Team";
report1.metadata.created = new Date();

// Display results
console.log("Original Invoice Template:", invoiceTemplate);
console.log("\nInvoice #1:", invoice1);
console.log("\nInvoice #2:", invoice2);
console.log("\nReport #1:", report1);

// Demonstrate that clones are independent
invoice1.content = "Modified content for Invoice #1";
console.log("\nAfter modification:")
console.log("Template content (unchanged):", invoiceTemplate.content);
console.log("Invoice #1 content (modified):", invoice1.content);
console.log("Invoice #2 content (unchanged):", invoice2.content);
