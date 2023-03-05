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

    componentDidMount() {
        super.componentDidMount();
        this.setProps({status: false})
        this.refs.chatContentModalRef.hide();
    }

    getStatus(): boolean | undefined {
        return this.props.status;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default AddChatContentModal;
