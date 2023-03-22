import Block from "../../utils/Block";
import template from "./error500page.hbs";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";

class Error500Page extends Block {

    constructor(props: {}) {
        super(props);
    }

    handleGoToChatClick() {
        Router.go(ROUTES.chat);
    }

    protected render(): DocumentFragment {
        return this.compile(
            template,
            {
                ...this.props,
                onHandleGoToChatClick: this.handleGoToChatClick.bind(this),
            });
    }
}

export default Error500Page;
