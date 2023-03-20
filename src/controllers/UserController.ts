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
            store.set('user.isLoading', true);
            const user = await this.api.update('/profile', data);
            store.set('user.data', user);
            router.go(ROUTES.profile);
        } catch (error: any) {
            store.set('user.error', error.message);
            throw error;
        } finally {
            store.set('user.isLoading', false);
        }
    }

    async updatePassword(data: Password) {
        try {
            store.set('user.isLoading', true);
            await this.api.update('/password', data);
            router.go(ROUTES.profile);
        } catch (error: any) {
            store.set('user.error', error.message);
        } finally {
            store.set('user.isLoading', false);
        }
    }

    async updateAvatar(data: FormData) {
        try {
            store.set('user.isLoading', true);
            await this.api.update('/profile/avatar', data);
            setTimeout(() => location.reload(), 0);
        } catch (e: any) {
            console.error(e);
        } finally {
            store.set('user.isLoading', false);
        }
    }
}

export default new UserController;
