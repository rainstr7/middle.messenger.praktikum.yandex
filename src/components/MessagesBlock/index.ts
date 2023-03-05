import Block from "../../utils/Block";
import template from "./messagesBlock.hbs";
import {MessageProps} from "../Message";

interface MessageBlockProps {
    messages: MessageProps[]
}


const templateMessages = [
    {
        id: '1',
        classNames: 'message direction-column m-b-40',
        message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент
            попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты
            летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны,
            так как астронавты с собой забрали только кассеты с пленкой.
            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не
            попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
        time: '11:56',
        isOwnMessage: false
    },
    {
        id: '2',
        classNames: 'my-message m-b-40',
        message: `Круто!`,
        time: '11:56',
        isOwnMessage: true
    },
];

class MessagesBlock extends Block {

    constructor(props: MessageBlockProps) {
        super(props);
    }

    addNewMessage(message: MessageProps) {
        this.setProps({...this.props, messages: [...this.props.messages, message]})
    }

    componentDidMount() {
        super.componentDidMount();
        this.setProps({
            ...this.props,
            messages: templateMessages,
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default MessagesBlock;
