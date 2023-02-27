import Block from "../../utils/Block";
import template from './title.hbs';

interface TitleProps {
    classNames?: string;
}

class Title extends Block {

    constructor(props: TitleProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Title;
