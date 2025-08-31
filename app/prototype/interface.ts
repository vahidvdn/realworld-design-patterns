/**
 * Generic prototype interface for cloneable objects
 */
export interface Prototype<T> {
  /**
   * Creates and returns a copy of the object
   */
  clone(): T;
}
