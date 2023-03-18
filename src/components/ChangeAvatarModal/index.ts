import Block from "../../utils/Block";
import template from './changeAvatarModal.hbs';
import store, {withStore} from "../../utils/Store";
import UserController from "../../controllers/UserController";

interface ChangeAvatarModalProps {
    classNames?: string;
}

class ChangeAvatarModal extends Block {

    constructor(props: ChangeAvatarModalProps) {
        super(props);
    }

    protected handleGoToProfileClick(event: PointerEvent) {
        event.preventDefault();
        console.log(this.refs);
        store.set('modals.changeAvatar', false);
    }

    //  async handleSaveAvatar (event: FormDataEvent) {
    //     event.preventDefault();
    //     const avatarInput = this.refs.AvatarInputRef.getContent() as HTMLInputElement;
    //      const data = new FormData(this.refs.AvatarFormRef.getContent() as HTMLFormElement);
    //     if (avatarInput.files) {
    //         console.log('avatarInput', avatarInput)
    //         console.log('avatarInput.files[0]', avatarInput.files[0])
    //         data.set('avatar', avatarInput.files[0]);
    //         await UserController.updateAvatar(data); //смена аватара
    //     }
    // }

    async handleChangeAvatar(event: FormDataEvent) {
        event.preventDefault();
        event.target;
        console.log('event.target', event.target.files)
        const formData = new FormData();
        if (event.target.files === null) {
            return;
        }
        const file = event.target.files[0];
        formData.append("avatar", file);
        UserController.updateAvatar(file)
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
            onChangeAvatar: this.handleChangeAvatar.bind(this),
            // onSaveChangeClick: this.handleSaveAvatar.bind(this),
            onCancelChangeClick: this.handleGoToProfileClick.bind(this),

        });
    }
}

const withUser = withStore((state) => ({...state.modals}))
export default withUser(ChangeAvatarModal);
