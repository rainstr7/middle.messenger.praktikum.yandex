import Block from "../../utils/Block";
import template from './chatHeaderMenuBlock.hbs';
import store, {Store, withStore} from "../../utils/Store";
import MessagesController from "../../controllers/MessagesController";
import ChatsController from "../../controllers/ChatsController";
import HTTPTransport from "../../utils/HTTPTransport";

class ChatHeaderMenuBlockBase extends Block {

    constructor(props: Store) {
        super(props);
    }

    handleOpenMenu() {
        store.set('activeModal', this.props.activeModal === 'user_menu' ? '' : 'user_menu');
    }

    async handleChoice(event: PointerEvent & { currentTarget: { id: string } }) {
        switch (event.currentTarget.id) {
            case 'add_user':
                store.set('activeModal', 'addUser');
                break;
            case 'del_user':
                store.set('activeModal', 'delUser');
                break;
            case 'del_chat':
                await ChatsController.delete(this.props.selectedChat)
                this.handleClose();
                break;
            default:
                break;
        }
    }

    handleClose() {
        store.set('activeModal', '');
    }

    handleAddNewMessageClick() {
        const message = (this.refs.newMessageInputRef.getContent() as HTMLInputElement).value || ''
        const activeChat = this.props.selectedChat;
        if (activeChat && message.trim()) {
            MessagesController.sendMessage(this.props.selectedChat, message);
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            isOpen: this.props.activeModal === 'user_menu',
            isOpenUserMenu: this.props.activeModal === 'addUser' || this.props.activeModal === 'delUser',
            onHandleChatMenuChoice: this.handleChoice.bind(this),
            onHandleOpenMenuClick: this.handleOpenMenu.bind(this),
            onHandleAddNewMessageClick: this.handleAddNewMessageClick.bind(this),
            onHandleClose: this.handleClose.bind(this),
            path: this.props.avatar ? `${HTTPTransport.API_URL}/resources${this.props.avatar}` : null,
        });
    }
}

const withState = withStore((state) => ({
    activeModal: state.activeModal,
    selectedChat: state.selectedChat,
    avatar: state.chats.find(({id}) => id === state.selectedChat)?.avatar
}))
export default withState(ChatHeaderMenuBlockBase as typeof Block);

