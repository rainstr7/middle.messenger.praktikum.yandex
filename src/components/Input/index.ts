import Block from "../../utils/Block";
import template from './input.hbs';

interface InputProps {
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    autocomplete?: "on" | "off"
    id: string;
    onblur?: (event: InputEvent) => void;
    onfocus?: (event: InputEvent) => void;
    onchange?: (event: InputEvent) => void;
    placeHolder?: string;
    required?: boolean;
    events: {
        blur: (event: InputEvent) => void;
        focus: (event: InputEvent) => void;
        onchange: (events: InputEvent) => void
    };
}

class Input extends Block {

    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                focus: props.onfocus,
                blur: props.onblur,
                change: props.onchange
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Input;
