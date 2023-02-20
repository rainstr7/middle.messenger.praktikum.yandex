import Block from "../../utils/Block";
import template from './button.hbs';

interface ButtonProps {
    label: string;
    onClick: () => void;
    classes: string;
    events: { //вынести в отдельный тип
        click: () => void;
    };
}

class Button extends Block {
    constructor(props: ButtonProps) {
        super({
            ...props, events: {
                click: props.onClick
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Button;
