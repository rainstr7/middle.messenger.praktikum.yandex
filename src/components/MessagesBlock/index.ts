import Block from "../../utils/Block";
import template from "./messagesBlock.hbs";
import {withStore} from "../../utils/Store";
import {MessageInterface} from "../../api/interfaces";

interface MessageBlockProps {
    messages: MessageInterface[],
    selectedChat: number,
    userId: number;
}

class MessengerBase extends Block {

    constructor(props: MessageBlockProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        });
    }
}

const withSelectedChatMessages = withStore((state) => {
    const selectedChatId = state.selectedChat;

    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            userId: state.user ? state.user.id : undefined
        };
    }
    const selectOwnMessages = ((state.messages || {})[selectedChatId] || [])
        .map((data) => ({...data, isOwnMessage: state.user && state.user.id === data.user_id}))
    return {
        messages: selectOwnMessages || [],
        selectedChat: state.selectedChat,
        userId: state.user && state.user.id
    };
});

export default withSelectedChatMessages(MessengerBase as typeof Block);
