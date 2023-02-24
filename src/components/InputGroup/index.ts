import Block from "../../utils/Block";
import template from './inputGroup.hbs';

class InputGroup extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        });
    }
}

export default InputGroup;
