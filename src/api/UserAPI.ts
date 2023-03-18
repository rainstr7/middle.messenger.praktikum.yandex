import BaseAPI from './BaseAPI';
import {Password, SignupData, User} from "./interfaces";

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    update(path: string, data: SignupData | Password): Promise<User> {
        return this.http.put(path, data);
    };

    updateAvatar(path: string, data: FormData): Promise<User> {
        return this.http.put(path, data);
    };

    read = undefined;
    create = undefined;
    delete = undefined;
}

export default new UserAPI();
