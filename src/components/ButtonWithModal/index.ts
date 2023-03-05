import Block from "../../utils/Block";
import template from './buttonWithModal.hbs';

interface ButtonWithModalProps {
    onHandleOpenChatMenuClick: () => void;
    status: boolean;
}

class ButtonWithModal extends Block {

    constructor(props: ButtonWithModalProps) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        this.setProps({status: false})
        this.refs.chatMenuModalRef.hide();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ButtonWithModal;
