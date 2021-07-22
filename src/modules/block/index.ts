import { v4 as makeUUID } from 'uuid';
import EventBus from '../event-bus';
import merge from '../../utils/merge';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CDU = 'flow:component-did-update',
}

export interface Props {
  block?: {
    [key: string]: unknown
  },
  attributes?: {
    [key: string]: string | string[];
  },
  events?: {
    [key: string]: (event: Event) => void;
  },
  components?: {
    [key: string]: Block
  },
  settings?: {
    [key: string]: unknown
  },
  list?: {
    [key: string]: HTMLDivElement;
  };
}

export type Indexed<T = unknown> = {
  [key: string]: T;
};

export abstract class Block {
  uuid: string | undefined;

  private meta: {
    tagName: string,
    props: Props
  };

  protected element: HTMLElement;

  props: Props;

  private eventBus: () => EventBus;

  constructor(tagName = 'div', props: Props) {
    this.meta = {
      tagName,
      props,
    };

    if (props.settings?.uuid) {
      this.uuid = makeUUID();
    }

    this.element = this.createResources();

    const eBus = new EventBus();
    this.eventBus = () => eBus;

    this.props = this.makePropsProxy(props as Indexed);

    this.registerEvents(eBus);

    this.eventBus().emit(EVENTS.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this.componenRender.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
  }

  private init() {
    this.addAttributes();
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  private createResources(): HTMLElement {
    const { tagName } = this.meta;
    return this.createDocumentElement(tagName, this.uuid);
  }

  protected createDocumentElement(tagName: string, uuid?: string): HTMLElement {
    const element = document.createElement(tagName);

    if (uuid) {
      element.setAttribute('data-id', uuid);
    }

    return element;
  }

  private addAttributes() {
    if (this.meta.props.attributes) {
      const { attributes } = this.meta.props;

      Object.keys(attributes).forEach((key) => {
        if (typeof attributes[key] === 'string') {
          this.element.setAttribute(key, attributes[key] as string);
        } else {
          this.element.setAttribute(key, (attributes[key] as string[]).join(' '));
        }
      });
    }
  }

  private componentDidMount() {
    this.mounted();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  abstract mounted(): void;

  private componenRender() {
    const block = this.render();

    if (typeof block === 'string') {
      this.element.innerHTML = block;
    }

    this.addComponents();
    this.addLists();
    this.addEvents();
  }

  abstract render(): string | void;

  private addComponents() {
    const { components = {} } = this.props;

    Object.keys(components).forEach((key) => {
      if (components[key] instanceof Block) {
        const tmplTag = this.element.querySelector(`t-${key}`);

        if (tmplTag && tmplTag instanceof HTMLElement) {
          tmplTag.parentElement?.replaceChild(components[key].getContent(), tmplTag);
        }
      }
    });
  }

  private addLists() {
    const { list = {} } = this.props;

    Object.keys(list).forEach((key) => {
      if (list[key] instanceof HTMLDivElement) {
        const tmplTag = this.element.querySelector(`l-${key}`);

        if (tmplTag && tmplTag instanceof HTMLElement) {
          tmplTag.parentElement?.replaceChild(list[key], tmplTag);
        }
      }
    });
  }

  private addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.element.addEventListener(eventName, events[eventName]);
    });
  }

  private removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.element.removeEventListener(eventName, events[eventName]);
    });
  }

  private componentDidUpdate() {
    this.removeEvents();
    this.componenRender();
  }

  setProps(nextProps: unknown): void {
    if (nextProps) {
      merge(this.props as Indexed, nextProps as Indexed);
    }
  }

  getContent(): HTMLElement {
    return this.element;
  }

  private makePropsProxy(props: Indexed): Indexed {
    if (props.constructor !== Object) {
      throw new Error('makePropsProxy(): props not object');
    }

    const result = {} as Indexed;

    (Object.keys(props) as Array<keyof Indexed>)
      .forEach(<K extends keyof Indexed>(key: K) => {
        if (typeof props[key] === 'object' && props[key] !== null && !Array.isArray(props[key]) && !(props[key] instanceof Block)) {
          result[key] = this.makePropsProxy(props[key] as Indexed);
        } else {
          result[key] = props[key];
        }
      });

    return this.makeProxy(result);
  }

  private makeProxy(props: Indexed): Indexed {
    return new Proxy<Indexed>(props, {
      get(target, prop: string) {
        const value = target[prop as keyof Indexed];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value: unknown) => {
        target[prop] = value;

        this.eventBus().emit(EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  display(value: 'block' | 'none'): void {
    this.element.style.display = value;
  }

  visibility(value: 'visible' | 'hidden'):void {
    this.element.style.visibility = value;
  }

  remove(): void {
    this.element.remove();
  }
}
