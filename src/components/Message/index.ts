import Block from "../../utils/Block";
import template from "./message.hbs";

export interface MessageProps {
    id: string;
    classNames: string;
    isOwnMessage: boolean;
    message: string;
    time: string;
}

class Message extends Block {

    constructor(props: MessageProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Message;
