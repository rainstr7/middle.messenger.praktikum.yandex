import Block from "../../utils/Block";
import template from './chatInfo.hbs';

interface ChatInfoProps {
    active: boolean;
    classNames: string;
    name: string;
    newMessage: number;
    text: string;
    time: string;
}

class ChatInfo extends Block {

    constructor(props: ChatInfoProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}


export default ChatInfo;
