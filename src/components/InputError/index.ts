import Block from "../../utils/Block";
import template from './inputError.hbs';

interface InputErrorProps {
    error?: string;
}

class InputError extends Block {
    constructor(props: InputErrorProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default InputError;
