import Block from "../../utils/Block";
import template from './button.hbs';

interface ButtonProps {
    onClick: (event: MouseEvent) => void;
    classNames: string;
    events: {
        click: (event: MouseEvent) => void;
    };
    type?: "submit" | "button"
}

class Button extends Block {

    constructor(props: ButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Button;
