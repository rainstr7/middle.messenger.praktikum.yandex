import Block from "../../utils/Block";
import template from "./backDropModal.hbs";
import store, {withStore} from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";

interface BackDropModalProps {
    classNames: string;
    status: boolean;
}

const modalsProps = {
    addUser: {
        title: 'Добавить пользователя',
        buttonLabel: 'Добавить',
        placeholder: 'Логин'
    },
    delUser: {
        title: 'Удалить пользователя',
        buttonLabel: 'Удалить',
        placeholder: 'Логин'

    }
}

class BackDropModalBase extends Block {

    constructor(props: BackDropModalProps) {
        super(props);
    }

    close() {
        store.set('activeModal', '');
    }

    handleBackDropClick(event: Event & { target: Element }) {
        const {id} = event.target;
        if (id === 'back-drop') {
            this.close();
        }
    }

    handleChangeUserList(event: Event & { currentTarget: { id: string } }) {
        const {id} = event.currentTarget;
        const userId = (this.refs.inputBackDropModalLoginRef.refs.inputRef.getContent() as HTMLInputElement).value;
        const activeChat = this.props.selectedChat;
        if (id && userId && activeChat) {
            switch (id) {
                case 'addUser':
                    ChatsController.addUserToChat(activeChat, +userId);
                    this.close();
                    break;
                case 'delUser':
                    ChatsController.delUserFromChat(activeChat, +userId);
                    this.close();
                    break;
                default:
                    this.close();
            }
        } else {
            this.close();
        }

    }

    handleClickCancel(event: Event) {
        event.preventDefault();
        this.close();
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            onBackDropClick: this.handleBackDropClick.bind(this),
            onCancelClick: this.handleClickCancel.bind(this),
            title: modalsProps.hasOwnProperty(this.props.activeModal as keyof typeof modalsProps) ?
                modalsProps[this.props.activeModal as keyof typeof modalsProps].title : '',
            placeholder: modalsProps.hasOwnProperty(this.props.activeModal as keyof typeof modalsProps) ?
                modalsProps[this.props.activeModal as keyof typeof modalsProps].placeholder : '',
            buttonLabel: modalsProps.hasOwnProperty(this.props.activeModal as keyof typeof modalsProps) ?
                modalsProps[this.props.activeModal as keyof typeof modalsProps].buttonLabel : '',
            onHandleClick: this.handleChangeUserList.bind(this),
            id: this.props.activeModal
        });
    }
}

const withModal = withStore((state) => (state));
export default withModal(BackDropModalBase as typeof Block);
