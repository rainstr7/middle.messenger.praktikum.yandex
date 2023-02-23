import Block from "../../utils/Block";
import template from './input.hbs';

class Input extends Block {

    constructor(props: any) {
        super({
            ...props,
            events: {
                focus: props.onfocus,
                blur: props.onblur,
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        });
    }
}

export default Input;
