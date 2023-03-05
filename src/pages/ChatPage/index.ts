import Block from "../../utils/Block";
import template from "./chat.hbs";
import renderDom from "../../utils/renderDom";

class ChatPage extends Block {

    constructor(props: any) {
        super(props);
    }

    getChats() {
        return [
            {
                name: 'Максим',
                text: 'Друзья, у меня для вас особенный выпуск новостей!',
                time: '10:49',
                newMessage: 3,
                active: false
            },
            {
                name: 'Максим',
                text: 'Друзья, у меня для вас особенный выпуск новостей!',
                time: '10:53',
                newMessage: 2,
                active: false
            },
            {
                name: 'Максим',
                text: 'Друзья, у меня для вас особенный выпуск новостей!',
                time: '11:11',
                newMessage: 0,
                active: true
            }
        ];
    }

    messagesOfCurrentChat(newMessage = {}) {
        return [
            {
                classNames: 'message direction-column m-b-40',
                message_text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент
                попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты
                летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны,
                так как астронавты с собой забрали только кассеты с пленкой.
                Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не
                попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
                time: '11:56',
                isOwnMessage: false
            },
            {
                classNames: 'my-message m-b-40',
                message_text: `Круто!`,
                time: '11:56',
                isOwnMessage: true
            },
            {...newMessage},
        ]
    }

    chatMenuModalContainerRef = this.refs.chatMenuModalContainerRef;

    handleGoToProfileClick() {
        renderDom('profile');
    }

    handleAddNewMessageClick() {
        console.log('added new message');
    }

    handleChatMenuChoice(event: any) {
        console.log(event.currentTarget.id, 'user');
        const ref = this.refs.chatMenuModalContainerRef;
        ref.setProps({status: false});
        ref.refs.chatMenuModalRef.hide();
    }

    handleCloseChatMenuClick() {
        if (this.chatMenuModalContainerRef.getStatus()) {
            this.chatMenuModalContainerRef.setProps({status: false});
            this.chatMenuModalContainerRef.refs.chatMenuModalRef.hide();
        }
    }

    handleOpenChatMenuClick(event: MouseEvent) {
        event.stopPropagation();
        this.chatMenuModalContainerRef.setProps({status: true});
        this.chatMenuModalContainerRef.refs.chatMenuModalRef.show();
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                chats: this.getChats.bind(this),
                messagesOfCurrentChat: this.messagesOfCurrentChat.bind(this),
                onHandleGoToProfileClick: this.handleGoToProfileClick.bind(this),
                onHandleAddNewMessageClick: this.handleAddNewMessageClick.bind(this),
                onHandleOpenChatMenuClick: this.handleOpenChatMenuClick.bind(this),
                onHandleCloseChatMenuClick: this.handleCloseChatMenuClick.bind(this),
                onHandleChatMenuChoice: this.handleChatMenuChoice.bind(this),
            }
        )
    }
}

export default ChatPage;
