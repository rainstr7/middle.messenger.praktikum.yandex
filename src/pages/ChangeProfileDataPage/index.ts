import Block from "../../utils/Block";
import template from "./changeProfileData.hbs";
import toCapitalize from "../../utils/toCapitalize";
import toCamelCase from "../../utils/toCamelCase";
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/registerRouters";
import {withStore} from "../../utils/Store";
import UserController from "../../controllers/UserController";
import {SignupData} from "../../api/interfaces";
import FormValidationController, {registrationErrors} from "../../controllers/FormValidationController";

class ChangeProfileDataPageBase extends Block {

    constructor(props: {}) {
        super(props);
    }

    controller = new FormValidationController;

    protected async handleChangeProfileDataClick(event: PointerEvent) {
        event.preventDefault();
        const allFields = Object.keys(this.refs)
            .map((keyOfRef) => this.refs[keyOfRef].refs.inputRef.getContent() as HTMLInputElement);

        const isValid = allFields.map((inputDomComponent) => this.getValidateStatus(
            inputDomComponent.value, toCamelCase((inputDomComponent.id))))
            .every((status => Boolean(status)));


        if (isValid) {
            const body = allFields.reduce((acc, {value, id}) => ({...acc, [id]: value}), {});
            console.log(body);
            await UserController.updateUserData(body as SignupData); //смена данных
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


    protected handleGoToProfileClick() {
        Router.go(ROUTES.profile);
    }

    protected handleBlur(event: InputEvent) {
        const target = event.target as HTMLTextAreaElement;
        this.getValidateStatus(target.value, toCamelCase(target.id));
    }

    protected handleFocus(event: InputEvent) {
        const target = event.target as HTMLTextAreaElement;
        this.getValidateStatus(target.value, toCamelCase(target.id));
    }

    componentDidMount() {
        super.componentDidMount();
        console.log(this.props)
        const allFields = Object.keys(this.refs)
            .map((keyOfRef) => this.refs[keyOfRef].refs.inputRef.getContent() as HTMLInputElement);
        allFields.forEach(input => input.value = this.props[input.id])
    }

    protected render(): DocumentFragment {
        return this.compile(
            template, {
                ...this.props,
                onHandleChangeProfileDataClick: this.handleChangeProfileDataClick.bind(this),
                onHandleGoToProfileClick: this.handleGoToProfileClick.bind(this),
                onHandleBlur: this.handleBlur.bind(this),
                onHandleFocus: this.handleFocus.bind(this),
            }
        )
    }
}

const withUser = withStore((state) => ({...state.user}))
export default withUser(ChangeProfileDataPageBase);
