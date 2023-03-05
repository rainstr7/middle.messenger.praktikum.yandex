import Block from "../../utils/Block";
import template from "./backDropModal.hbs";

interface BackDropModalProps {
    classNames: string;
    status: boolean;
}

class BackDropModal extends Block {

    constructor(props: BackDropModalProps) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        this.hide();
    }

    protected compile(template: (context: unknown) => string, context: Record<string, unknown>): DocumentFragment {

        return super.compile(template, context);
    }

    changeModalProps(props: any) {
        this.setProps({...this.props, ...props});
    }

    handleBackDropClick(event: Event & { target: Element }) {
        const {id} = event.target;
        if (id === 'back-drop') {
            this.close();
        }
    }

    handleClickCancel(event: Event) {
        event.preventDefault();
        this.close();
    }


    close() {
        this.hide();
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            onBackDropClick: this.handleBackDropClick.bind(this),
            onCancelClick: this.handleClickCancel.bind(this),
        });
    }
}

export default BackDropModal;
