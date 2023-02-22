import Block from "../../utils/Block";
import template from './title.hbs';

class Title extends Block {


    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Title;
