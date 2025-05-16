![composite-design-pattern](../../assets/composite-pattern.jpg)

## 💡 Use Case

Goal
We want to model a file system where:

- File is a leaf node.
- Directory is a composite that can contain both files and other directories.


## ✅ Good Practice


1. Identify Common Behavior
You want to treat individual objects (File) and groups of objects (Directory) uniformly.

➡️ So we define a common interface: FileSystemItem

```ts
interface FileSystemItem {
  getName(): string;
  getSize(): number;
  print(indent?: string): void;
}
```

This ensures both File and Directory implement the same methods.

2. Implement the Leaf Class (File)
A File is a leaf node — it has no children.

```ts
class File implements FileSystemItem {
  constructor(private name: string, private size: number) {}

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
```

getName() and getSize() return file data.

print() outputs the file info with indentation.

3. Implement the Composite Class (Directory)
A Directory is a composite — it contains children which can be Files or Directorys.

```ts
class Directory implements FileSystemItem {
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
    this.children.forEach(child => child.print(indent + '  '));
  }
}
```

add() allows building the tree.

getSize() calculates the total size recursively.

print() prints itself and then its children.

4. Use the Structure
Now you can build and use the tree uniformly, thanks to polymorphism:

```ts
const file1 = new File("file1.txt", 10);
const file2 = new File("file2.txt", 20);
const file3 = new File("image.png", 100);

const folder1 = new Directory("Documents");
folder1.add(file1);
folder1.add(file2);

const folder2 = new Directory("Pictures");
folder2.add(file3);

const root = new Directory("Root");
root.add(folder1);
root.add(folder2);

root.print();
```

You don’t need to know whether add() received a file or a directory — all you care about is that it's a FileSystemItem.

