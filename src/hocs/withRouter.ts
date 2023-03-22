import Block from '../utils/Block';
import Router from '../utils/Router';

export function withRouter(Component: typeof Block<any>) {
    type Props = typeof Component extends typeof Block<Record<string, any>> ? Record<string, any> : any;

    return class WithRouter extends Component {
        constructor(props: Props & PropsWithRouter) {
            super({...props, router: Router});
        }
    }
}

export interface PropsWithRouter {
    router: typeof Router;
}
