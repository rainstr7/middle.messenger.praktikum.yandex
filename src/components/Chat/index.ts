import Block from "../../utils/Block";
import template from './chat.hbs';
import normalizedTime from "../../utils/normalizedTime";
import {withStore} from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import HTTPTransport from "../../utils/HTTPTransport";

export interface ChatProps {
    id: string
    title: string
    avatar: string
    classNames: string
    unreadMessagesCount: number
    isActive: boolean
    time: string
    onSetActive: (event: MouseEvent) => void;
}

class ChatBase extends Block {

    constructor(props: ChatProps) {
        super(props);
    }

    handleSetActive(event: Event & { currentTarget: { id: string } }) {
        if (event && event.currentTarget && event.currentTarget.id) {
            ChatsController.selectChat(+event.currentTarget.id);
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            time: this.props.text ? normalizedTime(new Date(this.props.time)) : '',
            text: this.props.text || 'Чат пока пуст',
            isActive: this.props.id === this.props.selectedChat?.id,
            onSetActive: this.handleSetActive.bind(this),
            path: this.props.avatar ? `${HTTPTransport.API_URL}/resources${this.props.avatar}` : null,
        });
    }
}

export const withSelectedChat = withStore((state) => (
    {selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}
));

export default withSelectedChat(ChatBase as typeof Block);
