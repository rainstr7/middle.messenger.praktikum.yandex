import Block from "../../utils/Block";
import template from './chatInfo.hbs';

class ChatInfo extends Block {

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ChatInfo;
