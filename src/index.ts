// import Button from './components/Button';

// import HomePage from "./pages/HomePage";

// const ROUTES = {
//     home: HomePage,
// }
//
// function renderDom(route: keyof typeof ROUTES) {
//     const root = document.querySelector('#app')!;
//     const PageComponent = ROUTES[route];
//     root.innerHTML = '';
//     const page = new PageComponent({title: 'home'});
//
//     const homePage = new HomePage({ title: 'Home page' });
//     root.append(homePage.getContent()!);
//     homePage.dispatchComponentDidMount();
// }

import renderDom from "./utils/renderDom";
import registerComponent from "./utils/registerComponent";
import Button from "./components/Button";

// @ts-ignore
import components from './components/**/*.ts';

console.log('components', components)

Object.entries(components).forEach(([name, {index}]) => {
    registerComponent(name, index.default)
})

registerComponent('Button', Button);

window.addEventListener('DOMContentLoaded', () => {
    // const root = document.querySelector('#app')!;

    // const button = new Button(
    //     {
    //         label: 'TEST',
    //         events: {
    //             click: (event) => {
    //                 console.log(event.target)
    //             }
    //         }
    //     }
    // );
    // // root.innerHTML = button.element!.outerHTML;
    //
    // root.appendChild(button.element!);

    // button.dispatchComponentDidMount();

    // const homePage = new HomePage({ title: 'Home page' });
    //
    // root.append(homePage.getContent()!);
    //
    // homePage.dispatchComponentDidMount(); //реализовать в Block
    renderDom('home');
});
