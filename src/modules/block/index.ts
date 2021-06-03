import { v4 as makeUUID } from 'uuid';
import EventBus from '../event-bus';

enum EVENTS {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_RENDER = 'flow:render',
	FLOW_CDU = 'flow:component-did-update',
}

export interface Props {
	stylesWrap?: string[];
	events?: {
		[key: string]: (event: Event) => void;
	};
	setting?: {
		uuid: boolean;
	};

	[key: string]: unknown;
}

export class Block {
	meta: {
		show: boolean;
		tagName: string;
		uuid: string | null;
	};

	protected element: HTMLElement;

	props: Props;

	protected eventBus: () => EventBus;

	constructor(tagName = 'div', props: Props) {
		this.meta = {
			show: true,
			tagName,
			uuid: null,
		};

		const eventBus: EventBus = new EventBus();
		this.eventBus = () => eventBus;

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

		this.registerEvents(eventBus);

		this.meta.uuid = makeUUID();

		eventBus.emit(EVENTS.INIT);
	}

	private registerEvents(eventBus: EventBus): void {
		eventBus.on(EVENTS.INIT, this.init.bind(this));
		eventBus.on(EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
		eventBus.on(EVENTS.FLOW_RENDER, this.render.bind(this));
		eventBus.on(EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
	}

	private init(): void {
		this.createResources();

		this.eventBus().emit(EVENTS.FLOW_CDM);
	}

	private createResources(): void {
		this.element = document.createElement(this.meta.tagName);

		if (typeof this.props.setting === 'object' && this.props.setting.uuid) {
			this.element.setAttribute('data-id', this.meta.uuid);
		}

		if (this.props.stylesWrap) {
			this.props.stylesWrap.forEach((style) => {
				this.element.classList.add(style);
			});
		}
	}

	private componentDidMount() {
		this.mounted();
		this.eventBus().emit(EVENTS.FLOW_RENDER);
	}

	protected mounted(): void {}

	private render(): void {
		const inner = this.compile();
		if (inner.length) {
			this.element.innerHTML = inner;
		}

		this.addEvents();

		this.eventBus().emit(EVENTS.FLOW_CDU);
	}

	protected compile(): string {
		return '';
	}

	private componentDidUpdate(): void {
		this.update();
	}

	protected update(): void {}

	getContent(): HTMLElement {
		return this.element;
	}

	private addEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			if (eventName === 'focus' || eventName === 'blur' || eventName === 'submit') {
				this.element.firstChild.addEventListener(eventName, events[eventName].bind(this));
			} else {
				this.element.addEventListener(eventName, events[eventName].bind(this));
			}
		});
	}

	setProps<T>(nextProps: T): void {
		this.removeEvents();

		Object.assign(this.props, nextProps);

		this.eventBus().emit(EVENTS.FLOW_RENDER);
	}

	private removeEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			this.element.removeEventListener(eventName, events[eventName]);
		});
	}

	show(): void {
		this.element.style.visibility = 'visible';
		this.meta.show = true;
	}

	hide(): void {
		this.element.style.visibility = 'hidden';
		this.meta.show = false;
	}

	hidden(value: boolean): void {
		this.element.hidden = value;
	}

	remove(): void {
		if (this.meta.uuid) {
			document.querySelector(`[data-id="${this.meta.uuid}"]`).remove();
		}
	}
}
