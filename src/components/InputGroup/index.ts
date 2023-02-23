import Block from "../../utils/Block";
import template from './inputGroup.hbs';

interface InputProps {
    type: string;
}

class InputGroup extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
        });
    }

    protected render(): DocumentFragment {
        console.log('this.children', this.children);
        console.log('this.refs', this.refs);
        console.log('this.refs key???', Object.keys(this.refs));
        console.log('this.refs ???', this.refs.inputErrorRef);
        return this.compile(template, {
            ...this.props,
        });
    }
}

export default InputGroup;

// {
//     "inputErrorRef": {
//         "id": "pzbWYL",
//         "refs": {},
//         "_element": {},
//         "_meta": {
//         "props": {
//             "ref": "inputErrorRef"
//         }
//     },
//         "children": {},
//         "props": {
//         "ref": "inputErrorRef"
//     }
// }
// }
