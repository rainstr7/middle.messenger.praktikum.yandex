import Block from "../../utils/Block";
import template from './input.hbs';

interface InputProps {
    type: string;
}

class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
        });
    }

    get value() {
        return (this.element as HTMLInputElement).value;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Input;
