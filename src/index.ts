import registerComponent from "./utils/registerComponent";
// @ts-ignore
import components from './components/**/*.ts';
import Router from "./utils/Router";
import AuthController from "./controllers/AuthController";
import registerRouters, {ROUTES} from "./utils/registerRouters";

// @ts-ignore
Object.entries(components).forEach(([name, {index}]) => {
    registerComponent(name, index.default)

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
