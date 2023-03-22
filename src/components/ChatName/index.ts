import Block from "../../utils/Block";
import template from './chatName.hbs';
import {withStore} from "../../utils/Store";
import {ChatInfo} from "../../api/ChatsAPI";

interface ChatNameProps {
    title: string;
}

class ChatNameBase extends Block {

    constructor(props: ChatNameProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withChatName = withStore((state) => (
    {title: (state.chats || []).find(({id}: ChatInfo) => id === state.selectedChat)?.title || ''}
));

export default withChatName(ChatNameBase as typeof Block);
