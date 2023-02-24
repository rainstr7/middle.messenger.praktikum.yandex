import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import RegistrationPage from "../pages/RegistrationPage";
import Error500Page from "../pages/Error500Page";
import Error404Page from "../pages/Error404Page";
import ProfilePage from "../pages/ProfilePage";
import ChatPage from "../pages/ChatPage";
import ChangeProfileDataPage from "../pages/ChangeProfileDataPage";

const ROUTES = {
    home: HomePage,
    auth: AuthPage,
    registration: RegistrationPage,
    changeProfileData: ChangeProfileDataPage,
    chat: ChatPage,
    profile: ProfilePage,
    error500: Error500Page,
    error404: Error404Page,
}

function renderDom(route: keyof typeof ROUTES) {
    const root = document.querySelector('#app')!;
    const PageComponent = ROUTES[route];
    root.innerHTML = '';
    const page = new PageComponent({});
    root.append(page.getContent()!);
    page.dispatchComponentDidMount();
}

export default renderDom;
