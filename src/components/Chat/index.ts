import Block from "../../utils/Block";
import template from './chat.hbs';

export interface ChatProps {
    id: string;
    active: boolean;
    classNames: string;
    name: string;
    newMessage: number;
    text: string;
    time: string;
    events: {
        click: (event: MouseEvent) => void;
    };
    onClick: (event: MouseEvent) => void;
}

class Chat extends Block {

    constructor(props: ChatProps) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    componentDidMount() {
        super.componentDidMount();
        console.log(this.props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Chat;
