import Block from "../../utils/Block";
import template from './avatarProfile.hbs';
import UserController from "../../controllers/UserController";

interface AvatarProfileProps {
    classNames?: string;
}

class AvatarProfile extends Block {

    constructor(props: AvatarProfileProps) {
        super(props);
    }

    async handleChangeAvatar(event: InputEvent & { target: HTMLInputElement }) {
        event.preventDefault();
        const {files} = event.target;
        if (files === null) {
            return;
        }
        const formData = new FormData();
        formData.set("avatar", files[0]);
        await UserController.updateAvatar(formData);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            onChangeAvatar: this.handleChangeAvatar.bind(this)
        });
    }
}

export default AvatarProfile;
