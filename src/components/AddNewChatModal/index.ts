import Block from "../../utils/Block";
import template from './addNewChatModal.hbs';
import store, {withStore} from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";

interface TitleProps {
    isOpen: boolean;
    onCloseModal: () => void;
    onSave: () => void;
    activeModal: string;
    isLoading: boolean;
}

class AddNewChatModalBase extends Block {

    constructor(props: TitleProps) {
        super(props);
    }

    handleClose(event?: Event) {
        event?.preventDefault();
        store.set('activeModal', '');
    }

    async handleSave(event: Event) {
        event.preventDefault();
        const name = (this.refs.InputGroupNewChat.refs.inputRef.getContent() as HTMLInputElement).value || '';
        if (name.trim()) {
            await ChatsController.create(name);
        }
        this.handleClose();
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            isOpen: this.props.activeModal === 'add_new_chat',
            onCloseModal: this.handleClose.bind(this),
            onSave: this.handleSave.bind(this),
        });
    }
}

const withModal = withStore((state) => (
    {activeModal: state.activeModal, isLoading: state.isLoading}
))
export default withModal(AddNewChatModalBase as typeof Block);
