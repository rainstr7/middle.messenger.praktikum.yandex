import Block from "../../utils/Block";
import template from './inputError.hbs';

class InputError extends Block {

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            error: this.props.error

        });
    }
}

export default InputError;
