import Block from "../../utils/Block";
import template from "./profile.hbs";
import renderDom from "../../utils/renderDom";

class ProfilePage extends Block {

    handleChangePasswordClick(event: PointerEvent) {
        event.preventDefault();

    }

    handleChangeProfileDataClick(event: PointerEvent) {
        event.preventDefault();
    }

    handleGoAwayClick() {
        renderDom('home');
    }

    handleGoToChatsClick() {
        renderDom('chat');
    }

    profileInfo() {
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

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                handleChangePasswordClick: this.handleChangePasswordClick.bind(this),
                handleChangeProfileDataClick: this.handleChangeProfileDataClick.bind(this),
                handleGoToChatsClick: this.handleGoToChatsClick.bind(this),
                handleGoAwayClick: this.handleGoAwayClick.bind(this),
                profileInfo: this.profileInfo.bind(this)(),
            }
        )
    }
}

export default ProfilePage;
