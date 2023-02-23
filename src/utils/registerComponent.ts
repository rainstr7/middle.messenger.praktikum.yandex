import Handlebars from 'handlebars/dist/handlebars.runtime';
import Block from "./Block";

function registerComponent(name: string, Component: typeof Block) {
    Handlebars.registerHelper(name, function (props: any) {
        const {data, hash, fn} = props;
        // console.log(props)
        const {root} = data;
        if (!root.children) {
            root.children = {};
        }
        const component = new Component(hash);
        root.children[component.id] = component;
        if (fn) {
            return `<div data-id="${component.id}">${fn(this)}</div>`;
        } else {
            return `<div data-id="${component.id}"></div>`;
        }
    })
}

export default registerComponent;
