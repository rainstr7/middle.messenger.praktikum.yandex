import Block from "../../utils/Block";
import template from './form.hbs';

interface FormProps {
    classNames: string;
}

class Form extends Block {

    constructor(props: FormProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Form;
