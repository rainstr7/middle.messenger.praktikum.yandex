import Block from "../../utils/Block";
import template from "./auth.hbs";
import renderDom from "../../utils/renderDom";
import AuthController from "../../controllers/AuthController";

class AuthPage extends Block {
    constructor(props: any) {
        super({
            ...props,
        })
    }

    private static getLoginValue(): HTMLInputElement {
        return <HTMLInputElement>document.getElementById('login');
    }

    private static getPasswordValue(): HTMLInputElement {
        return <HTMLInputElement>document.getElementById('password');

    }

    handleAuthClick(event: PointerEvent) {
        event.preventDefault();
        const targetLogin = AuthPage.getLoginValue();
        const targetPassword = AuthPage.getPasswordValue();
        const login = this.getValidateStatus(targetLogin.value, targetLogin.id);
        const password = this.getValidateStatus(targetPassword.value, targetPassword.id);
        if (login && password) {
            this.setProps({
                errors: {
                    [targetLogin.id]: '',
                    [targetPassword.id]: '',
                }
            });
            console.log('start Auth process');
        }
    }

    handleGoToRegistrationClick() {
        renderDom('registration');
    }


    handleFocus() {
    }

    getValidateStatus(data: string, id: string) {
        const controller = new AuthController;
        const textError = controller.validate(data);
        if (textError) {
            this.setProps({
                input: data,
                errors: {
                    ...this.props.errors,
                    [id]: textError,
                }
            });
            return false;
        }
        return true;
    }

    handleBlur(event: InputEvent) {
        const target = event.target as HTMLTextAreaElement;
        this.getValidateStatus(target.value, target.id);
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

export default AuthPage;
