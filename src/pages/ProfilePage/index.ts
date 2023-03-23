import Block from "../../utils/Block";
import template from "./profile.hbs";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";
import AuthController from "../../controllers/AuthController";
import {withStore} from "../../utils/Store";
import HTTPTransport from "../../utils/HTTPTransport";

class ProfilePageBase extends Block {

    constructor(props: {}) {
        super(props);
    }

    handleChangePasswordClick() {
        Router.go(ROUTES.changePassword);

    }

    handleChangeProfileDataClick() {
        Router.go(ROUTES.changeProfileData);
    }

    async handleGoAwayClick() {
        await AuthController.logout();
    }

    handleGoToChatsClick() {
        Router.go(ROUTES.chat);
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                handleChangePasswordClick: this.handleChangePasswordClick.bind(this),
                handleChangeProfileDataClick: this.handleChangeProfileDataClick.bind(this),
                handleGoToChatsClick: this.handleGoToChatsClick.bind(this),
                handleGoAwayClick: this.handleGoAwayClick.bind(this),
                path: this.props.avatar ? `${HTTPTransport.API_URL}/resources${this.props.avatar}` : null,
            }
        )
    }
}

const withUser = withStore((state) => ({...state.user, isLoading: state.isLoading}))
export default withUser(ProfilePageBase);

