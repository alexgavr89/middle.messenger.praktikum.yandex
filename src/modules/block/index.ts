import EventBus from '../event-bus';
import makeProxyProps from '../my-proxy';

enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER =  'flow:render',
    FLOW_CDU =  'flow:component-did-update',
}

export default abstract class Block<T> {
    protected meta;
    protected element: HTMLElement;
    props;
    protected eventBus: () => EventBus;

    protected constructor(tagName = 'div', props: T) {
        this.meta = {
            tagName,
            props,
        };

        const eventBus: EventBus = new EventBus();
        this.eventBus = () => eventBus;

        this.props = makeProxyProps(props);

        this.registerEvents(eventBus);

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

        if (this.props.stylesWrap) {
            for (const style of this.props.stylesWrap) {
                this.element.classList.add(style);
            }
        }
    }

    private componentDidMount() {
        this.mounted();
        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }

    abstract mounted(): void;

    private render(): void {
        this.element.innerHTML = this.compile();

        this.addEvents();

        this.eventBus().emit(EVENTS.FLOW_CDU);
    }

    abstract compile(): string;

    private componentDidUpdate(): void {
        this.update();
    }

    abstract update(): void;

    getContent(): HTMLElement {
        return this.element;
    }

    private addEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            if (eventName === 'focus' || eventName === 'blur' || eventName === 'submit') {
                this.element.firstChild
                    .addEventListener(eventName, events[eventName].bind(this));
            } else {
                this.element
                    .addEventListener(eventName, events[eventName].bind(this));
            }
        });
    }

    setProps<T>(nextProps: T): void {
        this.removeEvents();

        Object.assign(this.props, nextProps);

        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }

    private removeEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this.element.removeEventListener(eventName, events[eventName]);
        });
    }

    show(): void {
        this.element.style.visibility = 'visible';
    }

    hide(): void {
        this.element.style.visibility = 'hidden';
    }
}
