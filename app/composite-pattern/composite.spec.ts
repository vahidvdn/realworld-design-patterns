import { Directory, File } from "./composite";

describe('Composite Pattern: File System', () => {
  it('should return the correct size for a single file', () => {
    const file = new File('test.txt', 50);
    expect(file.getSize()).toBe(50);
    expect(file.getName()).toBe('test.txt');
  });

  it('should return the correct size for a directory with files', () => {
    const file1 = new File('a.txt', 10);
    const file2 = new File('b.txt', 20);
    const dir = new Directory('Documents');
    dir.add(file1);
    dir.add(file2);

    expect(dir.getName()).toBe('Documents');
    expect(dir.getSize()).toBe(30);
  });

  it('should calculate size recursively for nested directories', () => {
    const file1 = new File('file1.txt', 5);
    const file2 = new File('file2.txt', 10);
    const innerDir = new Directory('Inner');
    innerDir.add(file1);

    const outerDir = new Directory('Outer');
    outerDir.add(innerDir);
    outerDir.add(file2);

    expect(outerDir.getSize()).toBe(15);
  });

  it('should print the structure (use mock for console.log)', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const file = new File('test.txt', 10);
    const dir = new Directory('Root');
    dir.add(file);
    dir.print();

    expect(consoleSpy).toHaveBeenCalledWith('+ Root (10KB)');
    expect(consoleSpy).toHaveBeenCalledWith('  - test.txt (10KB)');

    consoleSpy.mockRestore();
  });
});
