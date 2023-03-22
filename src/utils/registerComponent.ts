import {HelperOptions} from 'handlebars';
import Handlebars from 'handlebars/dist/handlebars.runtime';
import Block from "./Block";

export interface BlockConstructable<Props = any> {
    cName: string;
    new(props: Props): Block;
}

function registerComponent<Props extends any>(name: string, Component: BlockConstructable<Props>) {
    Handlebars.registerHelper(name, function (this: Props, {hash: {ref, ...hash}, data, fn}: HelperOptions) {
        const {root} = data;
        if (!root.children) {
            root.children = {};
        }
        if (!root.refs) {
            root.refs = {};
        }
        const {children, refs} = data.root;
        const component = new Component(hash);
        children[component.id] = component;
        if (ref) {
            refs[ref] = component;
        }
        if (fn) {
            return `<div data-id="${component.id}">${fn(this)}</div>`;
        } else {
            return `<div data-id="${component.id}"></div>`;
        }
    })
}

export default registerComponent;
