import Block from "../../utils/Block";
import template from "./home.hbs";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";

class HomePage extends Block {

    constructor(props: {}) {
        super(props);
    }

    goToAuthPage() {
        Router.go(ROUTES.auth);
    }

    goToRegistrationPage() {
        Router.go(ROUTES.registration);
    }

    goTo500ErrorPage() {
        Router.go(ROUTES.error500);
    }

    goTo404ErrorPage() {
        Router.go(ROUTES.error404);
    }

    goToChatPage() {
        Router.go(ROUTES.chat);
    }

    goToProfilePage() {
        Router.go(ROUTES.profile);
    }

    goToChangeProfileDataPage() {
        Router.go(ROUTES.changeProfileData);
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
