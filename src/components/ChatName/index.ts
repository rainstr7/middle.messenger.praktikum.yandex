import Block from "../../utils/Block";
import template from './chatName.hbs';
import {withStore} from "../../utils/Store";
import {ChatInfo} from "../../api/ChatsAPI";

interface ChatNameProps {
    classNames?: string;
}

class ChatNameBase extends Block {

    constructor(props: ChatNameProps) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        console.log('this.props', this.props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withChatName = withStore((state) => (
    {title: (state.chats || []).find(({id}: ChatInfo) => id === state.selectedChat)?.title || ''}
));
export default withChatName(ChatNameBase);
