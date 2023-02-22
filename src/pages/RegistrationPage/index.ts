import Block from "../../utils/Block";
import template from "./registration.hbs";
import renderDom from "../../utils/renderDom";

class RegistrationPage extends Block {
    handleRegistrationClick(event: PointerEvent) {
        console.log(event);
        event.preventDefault();
    }

    handleGoToAuthClick() {
        renderDom('auth');
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                onHandleRegistrationClick: this.handleRegistrationClick.bind(this),
                onHandleGoToAuthClick: this.handleGoToAuthClick.bind(this),
            }
        )
    }
}

export default RegistrationPage;
