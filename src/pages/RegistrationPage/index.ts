import Block from "../../utils/Block";
import template from "./registration.hbs";
import RegistrationController, {registrationErrors} from "../../controllers/RegistrationController";
import toCapitalize from "../../utils/toCapitalize";
import toCamelCase from "../../utils/toCamelCase";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";
import AuthController from "../../controllers/AuthController";
import {SignupData} from "../../api/AuthAPI";

class RegistrationPage extends Block {

    constructor(props: {}) {
        super(props);
    }

    controller = new RegistrationController;

    protected async handleRegistrationClick(event: PointerEvent) {
        event.preventDefault();
        const allFields = Object.keys(this.refs)
            .map((keyOfRef) => this.refs[keyOfRef].refs.inputRef.getContent() as HTMLInputElement);

        const isValid = allFields.map((inputDomComponent) => this.getValidateStatus(
            inputDomComponent.value, toCamelCase((inputDomComponent.id))))
            .every((status => Boolean(status)));


        if (isValid) {
            const body = allFields.reduce((acc, {value, id}) => ({...acc, [id]: value}), {});
            console.log('RegistrationPage', body)
            await AuthController.signup(body as SignupData);
        }
    }

    protected getValidateStatus(inputData: string, id: string) {

        const textError = this.controller.validate(inputData, id as keyof typeof registrationErrors);
        this.changeStatusError(textError, id);
        return !Boolean(textError);
    }

    protected changeStatusError(error: string | null, id: string) {
        const errorComponent = this.refs[`InputGroup${toCapitalize(id)}Ref`].refs.inputErrorRef
        errorComponent.setProps({error});
    }


    protected handleGoToAuthClick() {
        Router.go(ROUTES.auth);
    }

    protected handleBlur(event: InputEvent) {
        const target = event.target as HTMLTextAreaElement;
        this.getValidateStatus(target.value, toCamelCase(target.id));
    }

    protected handleFocus(event: InputEvent) {
        const target = event.target as HTMLTextAreaElement;
        this.getValidateStatus(target.value, toCamelCase(target.id));
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                onHandleRegistrationClick: this.handleRegistrationClick.bind(this),
                onHandleGoToAuthClick: this.handleGoToAuthClick.bind(this),
                onHandleBlur: this.handleBlur.bind(this),
                onHandleFocus: this.handleFocus.bind(this),
            }
        )
    }
}

export default RegistrationPage;
