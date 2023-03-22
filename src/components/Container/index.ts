import Block from "../../utils/Block";
import template from './container.hbs';

interface ContainerProps {
    onClick: (event: MouseEvent) => void;
    classNames: string;
    events: {
        click: (event: MouseEvent) => void;
    };
}

class Container extends Block {

    constructor(props: ContainerProps) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Container;
