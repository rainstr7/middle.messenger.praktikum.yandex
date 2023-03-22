import Block from "../../utils/Block";
import template from './addChatContentModal.hbs';

interface AddChatContentProps {
    onHandleOpenMenuClick: () => void;
    status: boolean;
}

class AddChatContentModal extends Block {

    constructor(props: AddChatContentProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default AddChatContentModal;
