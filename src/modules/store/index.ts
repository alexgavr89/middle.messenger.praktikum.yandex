import EventBus from '../event-bus';

type IStore<T = unknown> = {
  [key: string]: T;
};

export default class Store {
  private static instance: Store;

  private props: IStore;

  private eventBus: () => EventBus;

  private constructor(props: IStore) {
    this.props = {};
    this.setProps(props);

    const eBus = new EventBus();
    this.eventBus = () => eBus;
  }

  static getInstance(props = {}): Store {
    if (!Store.instance) {
      Store.instance = new Store(props as IStore);
    }

    return Store.instance;
  }

  get(
    findPath: string,
    path?: string | undefined,
    obj = this.props,
  ): unknown {
    let result;

    for (const key of Object.keys(obj)) {
      if (obj[key] instanceof Object) {
        result = this.get(findPath, path ? `${path}.${key}` : key, obj[key] as IStore);

        if (result) {
          return result;
        }
      }

      if (findPath === (path ? `${path}.${key}` : key)) {
        return obj[key];
      }
    }

    return result;
  }

  addEvent(name: string, callback: <T>(...args: T[]) => void): void {
    this.eventBus().on(name, callback);
  }

  setProps(data: IStore): void {
    this.merge(this.props, data);
  }

  private merge(target: IStore, source: IStore, path = ''): void {
    if (!target) {
      target = {};
    }

    Object.keys(source).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        return;
      }

      try {
        if (source[key] !== null && !Array.isArray(source[key]) && typeof source[key] === 'object') { // source[key] instanceof Object
          if (!target[key]) {
            target[key] = {};
          }

          this.merge(target[key] as IStore, source[key] as IStore, path ? `${path}.${key}` : key);
        } else {
          target[key] = source[key];
        }
      } catch (e) {
        target[key] = source[key];
      }

      const name = path ? `${path}.${key}` : key;
      this.eventBus().emit(name);
    });
  }

  deleteProps(data: IStore): void {
    this.delete(this.props, data);
  }

  private delete(target: IStore, source: IStore, path = ''): void {
    if (!target) {
      target = {};
    }

    Object.keys(source).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        return;
      }

      if (source[key] instanceof Object) {
        if (!target[key]) {
          target[key] = {};
        }

        this.merge(target[key] as IStore, source[key] as IStore, path ? `${path}.${key}` : key);
      } else {
        delete target[key];
      }
    });
  }
}
