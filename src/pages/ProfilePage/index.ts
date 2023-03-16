import Block from "../../utils/Block";
import template from "./profile.hbs";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";
import AuthController from "../../controllers/AuthController";
import {withStore} from "../../utils/Store";

class ProfilePageBase extends Block {

    constructor(props: {}) {
        super(props);
    }

    handleChangePasswordClick(event: PointerEvent) {
        event.preventDefault();

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

    init() {
        return [
            {
                label: 'Почта',
                information: 'pochta@yandex.ru'
            },
            {
                label: 'Логин',
                information: 'ivanivanov'
            },
            {
                label: 'Имя',
                information: 'Иван'
            },
            {
                label: 'Фамилия',
                information: 'Иванов'
            },
            {
                label: 'Имя в чате',
                information: 'Иван'
            },
            {
                label: 'Телефон',
                information: '+7 (909) 967 30 30'
            },
        ]
    }

    componentDidMount() {
        super.componentDidMount();
        console.log('this.props', this.props.first_name);
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                handleChangePasswordClick: this.handleChangePasswordClick.bind(this),
                handleChangeProfileDataClick: this.handleChangeProfileDataClick.bind(this),
                handleGoToChatsClick: this.handleGoToChatsClick.bind(this),
                handleGoAwayClick: this.handleGoAwayClick.bind(this),
                profileInfo: this.init.bind(this)(),
            }
        )
    }
}

const withUser = withStore((state) => ({...state.user}))
export default withUser(ProfilePageBase);

