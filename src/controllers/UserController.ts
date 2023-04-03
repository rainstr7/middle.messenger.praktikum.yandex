import API, {UserAPI} from "../api/UserAPI";
import store from "../utils/Store";
import {Password, SignupData} from "../api/interfaces";
import router from "../utils/Router";
import {ROUTES} from "../utils/registerRouters";

class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }

    async updateUserData(data: SignupData) {
        try {
            store.set('isLoading', true);
            const user = await this.api.update('/profile', data);
            store.set('user', user);
            router.go(ROUTES.profile);
        } catch (error) {
            store.set('error', (error as Error).message);
            throw error;
        } finally {
            store.set('isLoading', false);
        }
    }

    async updatePassword(data: Password) {
        try {
            store.set('isLoading', true);
            await this.api.update('/password', data);
            router.go(ROUTES.profile);
        } catch (error) {
            store.set('error', (error as Error).message);
        } finally {
            store.set('isLoading', false);
        }
    }

    async updateAvatar(data: FormData) {
        try {
            store.set('isLoading', true);
            await this.api.update('/profile/avatar', data);
            setTimeout(() => location.reload(), 0);
        } catch (e) {
            console.error(e);
        } finally {
            store.set('isLoading', false);
        }
    }
}

export default new UserController;
