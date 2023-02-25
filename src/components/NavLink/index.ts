import Block from "../../utils/Block";
import template from './navlink.hbs';

interface NavLinkProps {
    classNames?: string;
    events: {
        click: () => void;
    }
    onClick: () => void;
}

class NavLink extends Block {

    constructor(props: NavLinkProps) {
        super({
            ...props,
            events: {
                click: props.onClick
            },
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default NavLink;
