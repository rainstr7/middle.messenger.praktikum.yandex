import Block from "../../utils/Block";
import template from "./error500page.hbs";
import renderDom from "../../utils/renderDom";

class Error500Page extends Block {

    constructor(props: {}) {
        super(props);
    }

    handleGoToChatClick() {
        renderDom('chat');
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
