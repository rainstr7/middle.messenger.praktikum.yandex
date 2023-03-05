import Block from "../../utils/Block";
import {nanoid} from 'nanoid';
import template from "./chat.hbs";
import renderDom from "../../utils/renderDom";
import normalizedTime from "../../utils/normalizedTime";
import MessagesBlock from "../../components/MessagesBlock";
import ChangeUserListModal from "../../components/ChangeUserListModal";
import AddChatContentModal from "../../components/AddChatContentModal";
import Input from "../../components/Input";

class ChatPage extends Block {

    constructor(props: any) {
        super(props);
    }

    chatMenuModalContainerRef = this.refs.chatMenuModalContainerRef as ChangeUserListModal;
    chatAddContentModalContainerRef = this.refs.chatAddContentModalContainerRef as AddChatContentModal;
    newMessageInputRef = this.refs.newMessageInputRef as Input;
    inputMessageElement = this.newMessageInputRef.getContent() as HTMLInputElement;
    messagesContainerRef = this.refs.messagesContainerRef as MessagesBlock;

    handleGoToProfileClick() {
        renderDom('profile');
    }

    handleAddNewMessageClick() {
        if (this.inputMessageElement && this.inputMessageElement.value.trim()) {
            const message = this.inputMessageElement.value;
            const newMessage = {
                id: nanoid(),
                classNames: 'my-message m-b-40',
                message,
                time: normalizedTime(new Date(Date.now())),
                isOwnMessage: true
            };
            (this.messagesContainerRef).addNewMessage(newMessage);
            this.inputMessageElement.value = '';
        }

    }

    handleChatMenuChoice(event: any) {
        console.log(event.currentTarget.id);
        const ref = this.refs.chatMenuModalContainerRef;
        ref.setProps({status: false});
        ref.refs.chatMenuModalRef.hide();
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
