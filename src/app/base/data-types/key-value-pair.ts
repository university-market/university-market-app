export class KeyValuePair<K, V> {
  
  public readonly key: K = null;
  public readonly value: V = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}