import Block from "../../utils/Block";
import template from './loader.hbs';

interface LoaderProps {
    classNames?: string;
}

class Loader extends Block {

    constructor(props: LoaderProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Loader;
