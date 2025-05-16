// Component Interface
export interface FileSystemItem {
  getName(): string;
  getSize(): number;
  print(indent?: string): void;
}

// Leaf
export class File implements FileSystemItem {
  constructor(
    private name: string,
    private size: number,
  ) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  print(indent: string = ''): void {
    console.log(`${indent}- ${this.name} (${this.size}KB)`);
  }
}

// Composite
export class Directory implements FileSystemItem {
  private children: FileSystemItem[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  add(item: FileSystemItem): void {
    this.children.push(item);
  }

  getSize(): number {
    return this.children.reduce((acc, item) => acc + item.getSize(), 0);
  }

  print(indent: string = ''): void {
    console.log(`${indent}+ ${this.name} (${this.getSize()}KB)`);
    this.children.forEach((child) => child.print(indent + '  '));
  }
}
