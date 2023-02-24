import Block from "../../utils/Block";
import template from "./home.hbs";
import renderDom from "../../utils/renderDom";

class HomePage extends Block {

    goToAuthPage() {
        renderDom('auth');
    }

    goToRegistrationPage() {
        renderDom('registration');
    }

    goTo500ErrorPage() {
        renderDom('error500');
    }

    goTo404ErrorPage() {
        renderDom('error404');
    }

    goToChatPage() {
        renderDom('chat');
    }

    goToProfilePage() {
        renderDom('profile');
    }

    goToChangeProfileDataPage() {
        renderDom('changeProfileData');
    }

    protected render(): DocumentFragment {
        return this.compile(
            template,
            {
                ...this.props,
                goToAuthPage: this.goToAuthPage.bind(this),
                goToRegistrationPage: this.goToRegistrationPage.bind(this),
                goTo404ErrorPage: this.goTo404ErrorPage.bind(this),
                goTo500ErrorPage: this.goTo500ErrorPage.bind(this),
                goToChatPage: this.goToChatPage.bind(this),
                goToProfilePage: this.goToProfilePage.bind(this),
                goToChangeProfileDataPage: this.goToChangeProfileDataPage.bind(this),
            });
    }
}

export default HomePage;
