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
    auth: withRouter(AuthPage) as typeof Block,
    registration: withRouter(RegistrationPage) as typeof Block,
    changeProfileData: withRouter(ChangeProfileDataPage) as typeof Block,
    changePassword: withRouter(ChangePasswordPage),
    chat: withRouter(ChatPage) as typeof Block,
    profile: withRouter(ProfilePage) as typeof Block,
    error500: withRouter(Error500Page) as typeof Block,
    error404: withRouter(Error404Page) as typeof Block,
}

const registerRouters = () => {
    Object.keys(COMPONENTS).forEach((key: keyof typeof COMPONENTS) => {
            Router.use(ROUTES[key], COMPONENTS[key]);
        }
    );
}

export default registerRouters;
