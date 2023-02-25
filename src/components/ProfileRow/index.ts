import Block from "../../utils/Block";
import template from "./profileRow.hbs";

interface ProfileRowProps {
    information: string;
    label: string;
}

class ProfileRow extends Block {

    constructor(props: ProfileRowProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ProfileRow;
