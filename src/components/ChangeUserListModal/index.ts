import Block from "../../utils/Block";
import template from './changeUserListModal.hbs';

interface ChangeUserListModalProps {
    onHandleOpenMenuClick: () => void;
    status: boolean;
}

class ChangeUserListModal extends Block {

    constructor(props: ChangeUserListModalProps) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        this.setProps({status: false})
        this.refs.chatMenuModalRef.hide();
    }

    getStatus(): boolean | undefined {
        return this.props.status;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ChangeUserListModal;
