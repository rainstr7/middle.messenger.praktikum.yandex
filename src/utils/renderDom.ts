import HomePage from "../pages/HomePage";

const ROUTES = {
    home: HomePage,
}

function renderDom(route: keyof typeof ROUTES) {
    const root = document.querySelector('#app')!;
    const PageComponent = ROUTES[route];
    root.innerHTML = '';
    const page = new PageComponent({title: 'home'});

    // const homePage = new HomePage({ title: 'Home page' });
    root.append(page.getContent()!);
    // page.dispatchComponentDidMount();
}

export default renderDom;
