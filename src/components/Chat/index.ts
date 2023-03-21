import Block from "../../utils/Block";
import template from './chat.hbs';
import normalizedTime from "../../utils/normalizedTime";
import {withStore} from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";

export interface ChatProps {
    id: string;
    active: boolean;
    classNames: string;
    name: string;
    newMessage: number;
    text: string;
    time: string;
    events: {
        click: (event: MouseEvent) => void;
    };
    onClick: (event: MouseEvent) => void;
}

class ChatBase extends Block {

    constructor(props: ChatProps) {
        super({
            ...props,
            events: {
                click: props.onClick
            },
        });
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
            text: this.props.text || 'empty chat',
            isActive: this.props.id === this.props.selectedChat?.id,
            onSetActive: this.handleSetActive.bind(this),
        });
    }
}

export const withSelectedChat = withStore(state => ({selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}));

export default withSelectedChat(ChatBase);
