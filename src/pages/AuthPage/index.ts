import Block from "../../utils/Block";
import template from "./auth.hbs";
import AuthController, {authErrors} from "../../controllers/AuthController";
import toCapitalize from "../../utils/toCapitalize";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";
import {SigninData} from "../../api/interfaces";
import {withStore} from "../../utils/Store";

class AuthPageBase extends Block {

    constructor(props: {}) {
        super(props);
    }

    protected changeStatusError(error: string | null, id: keyof typeof authErrors) {
        const errorComponent = this.refs[`InputGroup${toCapitalize(id)}Ref`].refs.inputErrorRef
        if (errorComponent) {
            errorComponent.setProps({error});
        }
    }

    protected getValidateStatus(data: string, id: keyof typeof authErrors) {
        const textError = AuthController.validate(data, id);
        this.changeStatusError(textError, id);
        return !textError;
    }

    protected async handleAuthClick(event: PointerEvent) {
        event.preventDefault();

        const allFields = Object.keys(this.refs)
            .map((keyOfRef) => this.refs[keyOfRef].refs.inputRef.getContent() as HTMLInputElement)

        const isValid = allFields.map((inputDomComponent) => this.getValidateStatus(
            inputDomComponent.value, inputDomComponent.id as keyof typeof authErrors))
            .every((status => Boolean(status)));

        if (isValid) {
            const body = allFields.reduce((acc, {value, id}) => ({...acc, [id]: value}), {});
            await AuthController.signin(body as SigninData);
        }
    }

    protected handleGoToRegistrationClick() {
        Router.go(ROUTES.registration);
    }

    protected handleBlur(event: InputEvent) {
        const target = event.target as HTMLTextAreaElement;
        this.getValidateStatus(target.value, target.id as keyof typeof authErrors);
    }

    protected handleFocus(event: InputEvent) {
        const target = event.target as HTMLTextAreaElement;
        this.getValidateStatus(target.value, target.id as keyof typeof authErrors);
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                onHandleAuthClick: this.handleAuthClick.bind(this),
                onHandleGoToRegistrationClick: this.handleGoToRegistrationClick.bind(this),
                onHandleBlur: this.handleBlur.bind(this),
                onHandleFocus: this.handleFocus.bind(this),
                errors: this.props.errors,
            }
        )
    }
}

const withUser = withStore((state) => ({...state.user}))
export default withUser(AuthPageBase);

