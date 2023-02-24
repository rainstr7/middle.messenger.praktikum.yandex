import Block from "../../utils/Block";
import template from "./profileRow.hbs";

class ProfileRow extends Block {

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        });
    }
}

export default ProfileRow;
