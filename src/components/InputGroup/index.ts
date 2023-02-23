import Block from "../../utils/Block";
import template from './inputGroup.hbs';

interface InputProps {
    type: string;
}

class InputGroup extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        });
    }
}

export default InputGroup;
