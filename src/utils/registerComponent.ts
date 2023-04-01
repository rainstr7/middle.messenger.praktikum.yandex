import Handlebars, {HelperOptions} from 'handlebars';
// const Handlebars = require('handlebars-loader/runtime');
// import Handlebars from 'handlebars-template-loader/runtime';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
// const Handlebars = require('handlebars');
import Block from "./Block";

export interface BlockConstructable<Props = unknown> {
    cName: string;

    new(props: Props): Block;
}

function registerComponent<Props extends unknown>(name: string, Component: BlockConstructable<Props>) {
    console.log('name', name)
    console.log('Component', Component)
    console.log('Handlebars', Handlebars.registerHelper)
    Handlebars.registerHelper(name, function (this: Props, {hash: {ref, ...hash}, data, fn}: HelperOptions) {
        console.log('data', data)
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
            return new Handlebars.SafeString(`<div data-id="${component.id}">${fn(this)}</div>`);
        } else {
            return new Handlebars.SafeString(`<div data-id="${component.id}"></div>`);
        }
    });
}

export default registerComponent;
