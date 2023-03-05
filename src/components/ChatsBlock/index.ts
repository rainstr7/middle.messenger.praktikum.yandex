import Block from "../../utils/Block";
import template from "./chatBlock.hbs";
import {ChatProps} from "../Chat";

interface ChatsBlockProps {
    chats: ChatProps[];
    onClick: (event: MouseEvent) => void;
    events: {
        click: (event: MouseEvent) => void;
    };
}

const templateChats = [
    {
        id: '1',
        name: 'Максим',
        text: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '10:49',
        unreadMessagesCount: 3,
        active: false
    },
    {
        id: '2',
        name: 'Иван',
        text: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '10:53',
        unreadMessagesCount: 2,
        active: false
    },
    {
        id: '3',
        name: 'Талгат',
        text: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '11:11',
        unreadMessagesCount: 0,
        active: true
    }
]

class ChatsBlock extends Block {

    constructor(props: ChatsBlockProps) {
        super(props)
    }

    addNewChat(chat: ChatProps) {
        this.setProps({...this.props, chats: [...this.props.chats, chat]})
    }

    setActive(event: any) {
        const currentID = event.currentTarget.id;
        this.setProps({
            ...this.props,
            chats: this.props.chats.map(({id, active, ...rest}: ChatProps) => {
                console.log(id, currentID)
                return ({...rest, id, active: currentID === id})
            })
        })
        console.log(this.props.chats);
    }

    componentDidMount() {
        super.componentDidMount();
        const extendedTempChats = templateChats.map((chat) => ({...chat, onClick: this.setActive.bind(this)}))
        this.setProps({
            ...this.props,
            chats: extendedTempChats,
        })
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
            }
        )
    }
}

export default ChatsBlock;
