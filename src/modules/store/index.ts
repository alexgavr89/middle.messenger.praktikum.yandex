import EventBus from '../event-bus';

interface IStore {
  [key: string]: unknown;
}

export default class Store {
  private static instance: Store;

  props: { [key: string]: unknown };

  private eventBus: EventBus;

  private constructor(props: IStore) {
    this.props = new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop: string, value) {
        target[prop] = value;
        return true;
      },

      deleteProperty(target, prop: string) {
        delete target[prop];
        return true;
      },
    });

    this.eventBus = new EventBus();
  }

  static getInstance(props = {}): Store {
    if (!Store.instance) {
      Store.instance = new Store(props as IStore);
    }

    return Store.instance;
  }

  registerEvent(name: string, callback: <T>(...args: T[]) => void): void {
    this.eventBus.on(name, callback);
  }

  setProps(data: { [key: string]: unknown }): void {
    Object.assign(this.props, data);

    Object.keys(data).forEach((key) => {
      this.eventBus.emit(key, this.props[key]);
    });
  }
}
