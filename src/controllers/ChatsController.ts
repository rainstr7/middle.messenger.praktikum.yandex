import API, {ChatsAPI} from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = API;
    }

    async create(title: string) {
        await this.api.create(title);
        this.fetchChats();
    }

    async fetchChats() {
        const chats = await this.api.read();
        chats.map(async (chat) => {
            const token = await this.getToken(chat.id);
            await MessagesController.connect(chat.id, token);
        });
        store.set('chats', chats);
    }

    addUserToChat(id: number, userId: number) {
        this.api.addUsers(id, [userId]);
    }

    delUserFromChat(id: number, userId: number) {
        this.api.delUsers(id, [userId]);
    }

    async delete(id: number) {
        await this.api.delete(id);
        this.fetchChats();
    }

    async updateAvatar(data: FormData) {
        await this.api.updateAvatar(data)
        setTimeout(() => location.reload(), 0);
    }

    getToken(id: number) {
        return this.api.getToken(id);
    }

    selectChat(id: number) {
        store.set('activeModal', '');
        store.set('selectedChat', id);
    }
}

export default new ChatsController();
