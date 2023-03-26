import Block from "../../utils/Block";
import template from "./message.hbs";
import normalizedTime from "../../utils/normalizedTime";
import {MessageInterface} from "../../api/interfaces";

class Message extends Block {

    constructor(props: MessageInterface) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            time: normalizedTime(new Date(this.props.time)),
        });
    }
}

export default Message;
