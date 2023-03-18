import Block from "../../utils/Block";
import template from './avatarProfile.hbs';
import store, {withStore} from "../../utils/Store";

interface AvatarProfileProps {
    classNames?: string;
}

class AvatarProfile extends Block {

    constructor(props: AvatarProfileProps) {
        super(props);
    }

    handleOpen() {
        store.set('modals.changeAvatar', !this.props.changeAvatar);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props, onChangeAvatar: this.handleOpen.bind(this)});
    }
}

const withUser = withStore((state) => ({...state.modals}))
export default withUser(AvatarProfile);
