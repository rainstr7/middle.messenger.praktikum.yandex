import EventBus from "./EventBus";
import {nanoid} from 'nanoid';
import {Nullable, Undefined, Values} from "./types";

type Events = Values<typeof Block.EVENTS>;

class Block<P extends Record<string, any> = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const;

    public id = nanoid(6);
    protected props: P;
    public children: Record<string, Block | Block[]>;
    public refs: { [key: string]: Block } = {};
    private eventBus: () => EventBus<Events>;
    private _element: Nullable<HTMLElement> = null;

    constructor(propsWithChildren: P) {
        const eventBus = new EventBus<Events>();
        const {props, children} = this._getChildrenAndProps(propsWithChildren || {} as P);
        this.children = children;
        this.props = this._makePropsProxy(props || {} as P);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block | Block[]> } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (Array.isArray(value) && value.every(el => el instanceof Block)) {
                children[key] = value;
            } else if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {props: props as P, children};
    }

    _addEvents() {
        const {events = {}} = this.props as P & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus<Events>) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        // @ts-ignore
        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: P, newProps: P) {
        return true;
    }

    setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        this._removeEvents();
        this.children = {};
        this.refs = {};

        const fragment = this.render();
        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    protected compile(template: (context: unknown) => string, context: Record<string, unknown>) {
        const contextAndStubs = {...context, children: this.children, refs: this.refs};
        console.log('template', template)
        console.log('contextAndStubs', contextAndStubs)
        const html = template && template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;
        const compileComponent = (child: Block) => {
            const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
            if (!stub) {
                return;
            }
            child.getContent()?.append(...Array.from(stub.childNodes));
            stub.replaceWith(child.getContent()!);
        }
        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach(child => {
                    compileComponent(child);
                })
            } else {
                compileComponent(component)
            }
        });

        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: Undefined<P>) {
        return new Proxy(props as unknown as object, {
            get: (target: Record<string, unknown>, prop: string) => {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target: Record<string, unknown>, prop: string, value: unknown) => {
                const oldTarget = {...target}
                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        }) as unknown as P;
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    _removeEvents() {
        const events: Record<string, () => void> = (this.props).events;

        if (!events || !this._element) {
            return;
        }


        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        });
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}

export default Block;
