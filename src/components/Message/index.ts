import Block from "../../utils/Block";
import template from "./message.hbs";

class Message extends Block {

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        });
    }
}

export default Message;
