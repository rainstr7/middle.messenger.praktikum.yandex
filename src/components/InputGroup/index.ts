import Block from "../../utils/Block";
import template from './inputGroup.hbs';

interface InputGroupProps {
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    id: string;
    onblur?: (event: InputEvent) => void;
    onfocus?: (event: InputEvent) => void;
    placeHolder?: string;
    classNames?: string;
}


class InputGroup extends Block {

    constructor(props: InputGroupProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default InputGroup;
