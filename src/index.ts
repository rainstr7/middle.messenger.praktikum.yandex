import renderDom from "./utils/renderDom";
import registerComponent from "./utils/registerComponent";

import components from './components/**/*.ts';

console.log('components', components)

Object.entries(components).forEach(([name, {index}]) => {
    registerComponent(name, index.default)
})

window.addEventListener('DOMContentLoaded', () => {
    renderDom('auth');
});
