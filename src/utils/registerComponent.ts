import { HelperOptions } from 'handlebars';
import Handlebars from 'handlebars/dist/handlebars.runtime';
import Block from "./Block";

function registerComponent(name: string, Component: typeof Block) {
    Handlebars.registerHelper(name, function (props: HelperOptions) {
        const {data, hash, fn} = props;
        const {root} = data;
        if (!root.children) {
            root.children = {};
        }
        if (!root.refs) {
            root.refs = {};
        }
        const { children, refs } = data.root;
        const component = new Component(hash);


        children[component.id] = component;
        if (hash.ref) {
            refs[hash.ref] = component;
        }

        if (fn) {
            return `<div data-id="${component.id}">${fn(this)}</div>`;
        } else {
            return `<div data-id="${component.id}"></div>`;
        }
    })
}

export default registerComponent;
