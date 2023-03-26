import Block from "../../utils/Block";
import template from "./modal.hbs";

interface ModalProps {
    classNames: string;
}

class Message extends Block {

    constructor(props: ModalProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Message;
