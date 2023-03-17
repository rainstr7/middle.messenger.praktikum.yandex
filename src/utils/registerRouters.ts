import Router from "./Router";
import ProfilePage from "../pages/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage";
import AuthPage from "../pages/AuthPage";
import ChangeProfileDataPage from "../pages/ChangeProfileDataPage";
import ChatPage from "../pages/ChatPage";
import Error500Page from "../pages/Error500Page";
import Error404Page from "../pages/Error404Page";
import ChangePasswordPage from "../pages/ChangePasswordPage";

export const ROUTES = {
    auth: '/',
    registration: '/sign-up',
    changeProfileData: '/edit-settings',
    changePassword: '/edit-password',
    chat: '/messenger',
    profile: '/settings',
    error500: '/500',
    error404: '/404'
}

export const COMPONENTS = {
    auth: AuthPage,
    registration: RegistrationPage,
    changeProfileData: ChangeProfileDataPage,
    changePassword: ChangePasswordPage,
    chat: ChatPage,
    profile: ProfilePage,
    error500: Error500Page,
    error404: Error404Page,
}

const registerRouters = () => {
    Object.keys(COMPONENTS).forEach((key: keyof typeof COMPONENTS) => {
            Router.use(ROUTES[key], COMPONENTS[key]);
        }
    );
}

export default registerRouters;
