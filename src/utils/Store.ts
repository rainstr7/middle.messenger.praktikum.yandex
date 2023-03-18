import {set} from './helpers';
import Block from './Block';
import EventBus from "./EventBus";
import {User} from "../api/interfaces";

export enum StoreEvents {
    Updated = 'updated'
}

interface State {
    user: {
        data?: User;
        error?: string;
        isLoading?: boolean;
    },
    modals: {
        changeAvatar: boolean
    }
}

export class Store extends EventBus {
    private state: State = {
        user: {
            data: {
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
            error: undefined,
            isLoading: false,
        },
        modals: {
            changeAvatar: true
        }
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

export const withStore = (mapStateToProps: (state: any) => any) => (Component: typeof Block) => {
    let propsFromState: any;
    return class WithStore extends Component {
        constructor(props: any) {
            const newPropsFromState = mapStateToProps(store.getState());
            super({...props, ...newPropsFromState});
            store.on(StoreEvents.Updated, () => {
                const stateProps = mapStateToProps(store.getState());
                // if (isEqual(propsFromState, newPropsFromState)) {
                //     return;
                // }
                propsFromState = {...newPropsFromState};
                this.setProps({...stateProps});
            });
        }
    }

}

export default store;
