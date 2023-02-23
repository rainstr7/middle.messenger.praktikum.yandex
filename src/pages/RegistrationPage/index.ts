import Block from "../../utils/Block";
import template from "./registration.hbs";
import renderDom from "../../utils/renderDom";
import ProfileController from "../../controllers/ProfileController";
import toCamelCase from "../../utils/toCamelCase";

class RegistrationPage extends Block {
    handleRegistrationClick(event: PointerEvent) {
        console.log(event);
        event.preventDefault();
    }

    handleGoToAuthClick() {
        renderDom('auth');
    }

    getValidateStatus(data: string, id: string) {
        const controller: any = new ProfileController;
        const camelCaseId = toCamelCase(id);
        const textError = controller.validate(data, camelCaseId);
        if (textError) {
            this.setProps({
                input: data,
                errors: {
                    ...this.props.errors,
                    [camelCaseId]: textError,
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
                onHandleRegistrationClick: this.handleRegistrationClick.bind(this),
                onHandleGoToAuthClick: this.handleGoToAuthClick.bind(this),
                onHandleBlur: this.handleBlur.bind(this),
            }
        )
    }
}

export default RegistrationPage;
