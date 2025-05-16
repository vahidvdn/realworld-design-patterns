import { Directory, File } from "./composite";

const file1 = new File('file1.txt', 10);
const file2 = new File('file2.txt', 20);
const file3 = new File('image.png', 100);

const folder1 = new Directory('Documents');
folder1.add(file1);
folder1.add(file2);

const folder2 = new Directory('Pictures');
folder2.add(file3);

const root = new Directory('Root');
root.add(folder1);
root.add(folder2);

root.print();

// Output:
// + Root (130KB)
//   + Documents (30KB)
//     - file1.txt (10KB)
//     - file2.txt (20KB)
//   + Pictures (100KB)
//     - image.png (100KB)
