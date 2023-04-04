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
        setTimeout(() => location.reload(), 500);
        router.go(ROUTES.chat);
    }

    async signup(data: SignupData) {
        await this.call(() => this.api.signup(data));
        await this.call(() => this.fetchUser());
        router.go(ROUTES.chat);
    }

    async fetchUser() {
        const user = await this.call(() => this.api.read());
        store.set('user', user);
    }

    async logout() {
        await this.call(() => this.api.logout());
        store.set('user', undefined);
        router.go(ROUTES.auth);
    }

    private async call(cb: () => Promise<unknown>, errorCb = (error: Error) => {
        store.set('error', error.message);
    }) {
        try {
            store.set('isLoading', true);
            return await cb();
        } catch (e) {
            errorCb(e);
            throw e;
        } finally {
            store.set('isLoading', false);
        }
    }

    validate(data: string, id: keyof typeof authErrors) {
        return Boolean(data) ? null : authErrors[id];
    }
}

export default new AuthController;
