import API, {AuthAPI} from "../api/AuthAPI";
import router from "../utils/Router";
import store from "../utils/Store";
import {SigninData, SignupData} from "../api/interfaces";
import {ROUTES} from "../utils/registerRouters";

interface AuthControllerInterface {
    validate: (data: string, id: keyof typeof authErrors) => string | null;
}

export const authErrors = {
    login: 'Поле логин не может быть пустым',
    password: 'Поле пароль не может быть пустым'
}

class AuthController implements AuthControllerInterface {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SigninData) {
        await this.call(() => this.api.signin(data));
        setTimeout(() => location.reload(), 0);
        router.go(ROUTES.profile);
    }

    async signup(data: SignupData) {
        await this.call(() => this.api.signup(data));
        await this.call(() => this.fetchUser());
        setTimeout(() => location.reload(), 0);
        router.go(ROUTES.profile);
    }

    async fetchUser() {
        const user = await this.call(() => this.api.read());
        store.set('user.data', user);
    }

    async logout() {
        await this.call(() => this.api.logout());
        router.go(ROUTES.auth);
        store.set('user.data', undefined);
    }

    private async call(cb: () => Promise<any>, errorCb = (error: Error) => {
        store.set('user.error', error.message);
    }) {
        try {
            store.set('user.isLoading', true);
            return await cb();
        } catch (e) {
            errorCb(e);
            throw e;
        } finally {
            store.set('user.isLoading', false);
        }
    }

    validate(data: string, id: keyof typeof authErrors) {
        return Boolean(data) ? null : authErrors[id];
    }
}

export default new AuthController;
