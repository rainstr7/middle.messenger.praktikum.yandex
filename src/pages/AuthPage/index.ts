import Block from "../../utils/Block";
import template from "./auth.hbs";
import renderDom from "../../utils/renderDom";

class AuthPage extends Block {
    handleAuthClick(event: PointerEvent) {
        console.log(event);
        event.preventDefault();
    }

    handleGoToRegistrationClick() {
        renderDom('registration');
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                onHandleAuthClick: this.handleAuthClick.bind(this),
                onHandleGoToRegistrationClick: this.handleGoToRegistrationClick.bind(this),
            }
        )
    }
}

export default AuthPage;
