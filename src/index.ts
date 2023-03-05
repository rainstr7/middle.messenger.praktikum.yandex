import renderDom from "./utils/renderDom";
import registerComponent from "./utils/registerComponent";
// @ts-ignore
import components from './components/**/*.ts';

Object.entries(components).forEach(([name, {index}]) => {
    registerComponent(name, index.default)
})

window.addEventListener('DOMContentLoaded', () => {
    renderDom('chat');
});
