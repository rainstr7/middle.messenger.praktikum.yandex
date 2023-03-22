import Block from "../../utils/Block";
import template from './button.hbs';

interface ButtonProps {
    onClick: (event: MouseEvent) => void;
    onSubmit: (event: FormDataEvent) => void;
    classNames: string;
    events: {
        click: (event: MouseEvent) => void;
        onsubmit: (event: MouseEvent) => void;
    };
    type?: "submit" | "button";
    id: string;
}

class Button extends Block {

    constructor(props: ButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
                onsubmit: props.onSubmit
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Button;
