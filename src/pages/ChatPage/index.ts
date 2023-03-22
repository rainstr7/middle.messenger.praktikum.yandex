import Block from "../../utils/Block";
import template from "./chatPage.hbs";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";
import {withStore} from "../../utils/Store";


class ChatPage extends Block {

    constructor(props: any) {
        super(props);
    }

    handleGoToProfileClick() {
        Router.go(ROUTES.profile);
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                onHandleGoToProfileClick: this.handleGoToProfileClick.bind(this),
            }
        )
    }
}

const withState = withStore((state) => ({selectedChat: state.selectedChat}));
export default withState(ChatPage);
