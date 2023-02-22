import Block from "../../utils/Block";
import template from './input.hbs';

class Input extends Block {

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        });
    }
}

export default Input;
