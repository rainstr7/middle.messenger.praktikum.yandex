import Block from "../../utils/Block";
import template from "./chatBlock.hbs";
import {ChatProps} from "../Chat";
import store, {withStore} from "../../utils/Store";
import {ChatInfo} from "../../api/ChatsAPI";
import ChatsController from "../../controllers/ChatsController";

interface ChatsBlockProps {
    chats: ChatProps[];
    onClick: (event: MouseEvent) => void;
    selectedChat: ChatInfo;
    onCreateChat: () => void;
}

class ChatsBlockBase extends Block {

    constructor(props: ChatsBlockProps) {
        super(props)
    }

    addNewChat() {
        store.set('activeModal', 'add_new_chat');
    }

    async componentDidMount() {
        super.componentDidMount();
        await ChatsController.fetchChats();
    }


    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                onCreateChat: this.addNewChat.bind(this),
            }
        )
    }
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

export default withChats(ChatsBlockBase as typeof Block);
