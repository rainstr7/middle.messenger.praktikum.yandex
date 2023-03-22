import Block from "../../utils/Block";
import template from './changeUserListModal.hbs';

interface ChangeUserListModalProps {
    onHandleOpenChatMenuClick: () => void;
    onHandleChatMenuChoice: () => void;
    isOpen: boolean;
    id: string;
}

class ChangeUserListModal extends Block {

    constructor(props: ChangeUserListModalProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ChangeUserListModal;
