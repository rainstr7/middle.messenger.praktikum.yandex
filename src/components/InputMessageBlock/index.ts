import Block from "../../utils/Block";
import template from './inputMessageBlock.hbs';
import store, {Store, withStore} from "../../utils/Store";
import MessagesController from "../../controllers/MessagesController";

class InputMessageBlockBase extends Block {

    constructor(props: Store) {
        super(props);
    }

    handleOpenMenu() {
        store.set('activeModal', this.props.activeModal === 'add_content' ? '' : 'add_content');
    }

    handleChoice(event: PointerEvent & { currentTarget: { id: string } }) {
        switch (event.currentTarget.id) {
            case 'add_photo':
                console.log('open add photo action');
                store.set('activeModal', '');
                break;
            case 'add_file':
                console.log('open add file action');
                store.set('activeModal', '');
                break;
            case 'add-location':
                console.log('open add location action');
                store.set('activeModal', '');
                break;
            default:
                store.set('activeModal', '');
        }
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
            isOpen: this.props.activeModal === 'add_content',
            onHandleChatMenuChoice: this.handleChoice.bind(this),
            onHandleOpenMenuClick: this.handleOpenMenu.bind(this),
            onHandleAddNewMessageClick: this.handleAddNewMessageClick.bind(this)

        });
    }
}

const withUser = withStore((state) => ({...state}))
export default withUser(InputMessageBlockBase as typeof Block);

