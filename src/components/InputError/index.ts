import Block from "../../utils/Block";
import template from './inputError.hbs';

class InputError extends Block {


    protected render(): DocumentFragment {
        console.log('getContent', this);
        return this.compile(template, this.props);
    }
}

export default InputError;