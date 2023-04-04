import {set} from './helpers';
import Block from './Block';
import EventBus from "./EventBus";
import {Message} from "../controllers/MessagesController";
import {ChatInfo} from "../api/ChatsAPI";
import {User} from "../api/interfaces";

export enum StoreEvents {
    Updated = 'updated'
}

interface State {
    user: User;
    chats: ChatInfo[];
    messages: Record<number, Message[]>;
    selectedChat?: number;
    error?: string,
    isLoading: boolean,
    activeModal: string
}

export class Store extends EventBus {
    private state: State = {
        user: {
            id: 0,
            first_name: '',
            second_name: '',
            display_name: '',
            login: '',
            email: '',
            password: '',
            phone: '',
            avatar: '',
        },
        chats: [],
        messages: {},
        selectedChat: undefined,
        error: undefined,
        isLoading: false,
        activeModal: '',
    };

    public set(keyPath: string, data: unknown) {
        set(this.state, keyPath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
    return function wrap<P>(Component: typeof Block) {
        return class WithStore extends Component {
            constructor(props: Omit<P, keyof SP>) {
                let previousState = mapStateToProps(store.getState());
                super({...(props as P), ...previousState});
                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());
                    previousState = stateProps;
                    this.setProps({...stateProps});
                });
            }
        }
    }
}
export default store;
