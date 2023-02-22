import Block from "../../utils/Block";
import template from './form.hbs';

class Form extends Block {

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Form;
