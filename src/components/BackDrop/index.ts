import template from './backDrop.hbs';
import Block from "../../utils/Block";

interface BackDropProps {
    onClick: (event: MouseEvent) => void;
    events: {
        click: (event: MouseEvent) => void;
    };
}

class BackDrop extends Block {

    constructor(props: BackDropProps) {
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

export default BackDrop;
