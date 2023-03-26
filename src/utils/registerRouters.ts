import Router from "./Router";
import ProfilePage from "../pages/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage";
import AuthPage from "../pages/AuthPage";
import ChangeProfileDataPage from "../pages/ChangeProfileDataPage";
import ChatPage from "../pages/ChatPage";
import Error500Page from "../pages/Error500Page";
import Error404Page from "../pages/Error404Page";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import {withRouter} from "../hocs/withRouter";
import Block from "./Block";

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
    auth: withRouter(AuthPage),
    registration: withRouter(RegistrationPage),
    changeProfileData: withRouter(ChangeProfileDataPage),
    changePassword: withRouter(ChangePasswordPage),
    chat: withRouter(ChatPage),
    profile: withRouter(ProfilePage),
    error500: withRouter(Error500Page),
    error404: withRouter(Error404Page),
}

const registerRouters = () => {
    Object.keys(COMPONENTS).forEach((key: keyof typeof COMPONENTS) => {
        Router.use(ROUTES[key], COMPONENTS[key] as typeof Block);
        }
    );
}

export default registerRouters;
