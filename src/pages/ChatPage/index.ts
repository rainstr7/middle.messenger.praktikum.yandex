import Block from "../../utils/Block";
import {nanoid} from 'nanoid';
import template from "./chatPage.hbs";
import normalizedTime from "../../utils/normalizedTime";
import MessagesBlock from "../../components/MessagesBlock";
import ChangeUserListModal from "../../components/ChangeUserListModal";
import AddChatContentModal from "../../components/AddChatContentModal";
import Input from "../../components/Input";
import BackDropModal from "../../components/BackDropModal";
import toCamelCase from "../../utils/toCamelCase";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";

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

class ChatPage extends Block {

    constructor(props: any) {
        super(props);
    }


    chatMenuModalContainerRef = this.refs.chatMenuModalContainerRef as ChangeUserListModal;
    chatAddContentModalContainerRef = this.refs.chatAddContentModalContainerRef as AddChatContentModal;
    newMessageInputRef = this.refs.newMessageInputRef as Input;
    inputMessageElement = this.newMessageInputRef.getContent() as HTMLInputElement;
    messagesContainerRef = this.refs.messagesContainerRef as MessagesBlock;
    backDropModalContainerRef = this.refs.backDropModalContainerRef as BackDropModal;

    handleGoToProfileClick() {
        Router.go(ROUTES.profile);
    }

    handleAddNewMessageClick() {
        if (this.inputMessageElement && this.inputMessageElement.value.trim()) {
            const message = this.inputMessageElement.value;
            const newMessage = {
                id: nanoid(),
                classNames: 'my-message m-b-40',
                message,
                time: normalizedTime(new Date(Date.now())),
                isOwnMessage: true,
            };
            (this.messagesContainerRef).addNewMessage(newMessage);
            this.inputMessageElement.value = '';
        }
    }

    usersAction = (id: string) => (event: Event) => {
        event.preventDefault();
        const ref = this
            .refs.backDropModalContainerRef
            .refs.inputBackDropModalLoginRef;
        const inputRef = ref.refs.inputRef.getContent() as HTMLInputElement | null;
        if (inputRef) {
            console.log(id, inputRef.value)
            if (!inputRef.value.trim()) {
                ref.refs.inputErrorRef.setProps({error: 'Поле логин не может быть пустым'});
            } else {
                this.backDropModalContainerRef.close();
            }
        }
    }

    handleChatMenuChoice(event: any) {
        const {id} = event.currentTarget;
        const ref = this.refs.chatMenuModalContainerRef;
        ref.setProps({status: false});
        ref.refs.chatMenuModalRef.hide();
        if (id === 'add_user' || id === 'del_user') {
            const newProps = {...modalsProps[toCamelCase(id) as keyof typeof modalsProps]}
            this.backDropModalContainerRef.changeModalProps(
                {
                    ...newProps,
                    handleClick: this.usersAction(id),
                });
        }
    }

    handleCloseChatMenuClick() {
        if (this.chatMenuModalContainerRef.getStatus()) {
            this.chatMenuModalContainerRef.setProps({status: false});
            this.chatMenuModalContainerRef.refs.chatMenuModalRef.hide();
        }

        if (this.chatAddContentModalContainerRef.getStatus()) {
            this.chatAddContentModalContainerRef.setProps({status: false});
            this.chatAddContentModalContainerRef.refs.chatContentModalRef.hide();
        }
    }

    handleOpenMenuClick(event: Event & { currentTarget: Element }) {
        event.stopPropagation();
        const {id} = event.currentTarget;
        if (id) {
            switch (id) {
                case 'menu_user':
                    this.chatMenuModalContainerRef.setProps({status: true});
                    this.chatMenuModalContainerRef.refs.chatMenuModalRef.show();
                    return;
                case  'chat_content':
                    this.chatAddContentModalContainerRef.setProps({status: true});
                    this.chatAddContentModalContainerRef.refs.chatContentModalRef.show();
                    return;
                default:
                    return;
            }
        }
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                onHandleGoToProfileClick: this.handleGoToProfileClick.bind(this),
                onHandleAddNewMessageClick: this.handleAddNewMessageClick.bind(this),
                onHandleOpenMenuClick: this.handleOpenMenuClick.bind(this),
                onHandleCloseChatMenuClick: this.handleCloseChatMenuClick.bind(this),
                onHandleChatMenuChoice: this.handleChatMenuChoice.bind(this),
            }
        )
    }
}

export default ChatPage;
