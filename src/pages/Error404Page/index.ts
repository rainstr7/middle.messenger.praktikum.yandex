import Block from "../../utils/Block";
import template from "./error404page.hbs";
import renderDom from "../../utils/renderDom";

class Error400Page extends Block {

    handleGoToProfileClick() {
        renderDom('profile');
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
