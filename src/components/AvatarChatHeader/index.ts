import Block from "../../utils/Block";
import template from './avatarChatHeader.hbs';
import ChatsController from "../../controllers/ChatsController";

interface AvatarChatHeaderProps {
    onChangeAvatar: () => void;
    selectedChat: number;
    path?: string;
}

class AvatarChatHeader extends Block {

    constructor(props: AvatarChatHeaderProps) {
        super(props);
    }

    async handleChangeAvatar(event: InputEvent & { target: HTMLInputElement }) {
        event.preventDefault();
        const {files} = event.target;
        if (!files) {
            return;
        }
        const formData = new FormData();
        formData.set("avatar", files[0]);
        formData.set("chatId", this.props.selectedChat);
        await ChatsController.updateAvatar(formData);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            onChangeAvatar: this.handleChangeAvatar.bind(this)
        });
    }
}

export default AvatarChatHeader;
