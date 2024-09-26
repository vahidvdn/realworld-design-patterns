export interface Observer {
  notify(payload: any): boolean
}

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(payload): void;
}
