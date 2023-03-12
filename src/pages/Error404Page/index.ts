import Block from "../../utils/Block";
import template from "./error404page.hbs";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";


class Error400Page extends Block {

    constructor(props: {}) {
        super(props);
    }

    handleGoToProfileClick() {
        Router.go(ROUTES.profile);
    }

    protected render(): DocumentFragment {
        return this.compile(
            template,
            {
                ...this.props,
                onHandleGoToProfileClick: this.handleGoToProfileClick.bind(this),
            });
    }
}

export default Error400Page;
