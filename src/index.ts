import registerComponent from "./utils/registerComponent";
import Router from "./utils/Router";
import AuthController from "./controllers/AuthController";
import registerRouters, {ROUTES} from "./utils/registerRouters";
import '../src/styles/app.scss'

const components: any = {};

function importAll(r: any) {
    r.keys().forEach((key: string) => (components[key] = r(key)));
}

importAll(require.context('./components/', true, /(?<!.test).(?<ext>[cm]?ts|tsx)$/));

Object.entries(components).forEach(([path, component]: any[]) => {
    const name = path.split('/')[1];
    registerComponent(name, component.default)
})


window.addEventListener('DOMContentLoaded', async () => {
    registerRouters();
    let isProtectedRoute: boolean;

    switch (window.location.pathname) {
        case ROUTES.chat:
        case ROUTES.profile:
        case ROUTES.changeProfileData:
        case ROUTES.changePassword:
            isProtectedRoute = true;
            break;
        default:
            isProtectedRoute = false;
            break;
    }

    try {
        await AuthController.fetchUser();
        Router.start();
        if (!isProtectedRoute) {
            Router.go(ROUTES.chat)
        }
    } catch (e) {
        Router.start();
        if (isProtectedRoute) {
            Router.go(ROUTES.auth);
        }
    }
});
