# 📚 Prototype Pattern

## 💡 Use Case

Let's say you need to create multiple documents with similar properties (like templates for invoices, reports, etc.) without recreating the entire document structure each time.

## ❌ Bad Practice

```ts
// Creating multiple similar documents from scratch
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
```

Problems with this approach:
- Repetitive code for creating similar objects
- Manual property copying is error-prone
- No built-in way to clone objects
- Changes to document structure require updates in multiple places

## ✅ Good Practice

```ts
// Create document templates
const invoiceTemplate = new Document(
  "Invoice Template",
  "This is a standard invoice template with company logo.",
  { author: "System", created: new Date(), watermark: "Company Confidential" }
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
```

Benefits:
- Templates are defined once and reused
- Document structure is consistent
- Deep cloning ensures all properties are copied correctly
- Changes to templates only need to be made in one place
