interface ProfileControllerInterface {
    validate: (data: string, id: keyof typeof registrationErrors) => string | null;
}

interface RegistrationValidateInterface {
    email: RegExp;
    login: RegExp;
    firstName: RegExp;
    secondName: RegExp;
    displayName: RegExp;
    phone: RegExp;
    password: RegExp;
    oldPassword: RegExp;
    passwordRepeat: any;
}

export const registrationErrors = {
    email: 'Введите корректную электронную почту',
    login: 'Введите корректный логин',
    firstName: 'Введите корректное имя',
    secondName: 'Введите корректную фамилию',
    displayName: 'Введите корректное отображаемое имя',
    phone: 'Введите корректный номер телефона',
    password: 'Введите корректный пароль',
    oldPassword: 'Введите старый пароль',
    passwordRepeat: "Пароли не совпадают",
}

const validationMethods: RegistrationValidateInterface = {
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    login: /^[a-zA-Z](.[a-zA-Z0-9_-]*){2,19}$/,
    firstName: /^([А-Я][а-яё-]{1,23}|[A-Z][a-z-])$/,
    secondName: /^([А-Я][а-яё-]{1,23}|[A-Z][a-z-])$/,
    displayName: /^[a-zA-Zа-яёА-Я](.[a-zA-Z0-9_-а-яё]*){2,19}$/,
    phone: /^[0-9+][0-9]{9,14}$/,
    password: /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    oldPassword: /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    passwordRepeat: ([firstPassword, secondPassword]: string[]) => firstPassword === secondPassword,
};

class FormValidationController implements ProfileControllerInterface {

    protected password: string | null = null;

    validate(data: string, id: keyof typeof registrationErrors) {
        if (id === 'password') {
            this.password = data;
        }
        const method = validationMethods[id];
        if (id === 'passwordRepeat') {
            return this.password && method([this.password, data]) ? null : registrationErrors[id];
        }
        return method.test(data) ? null : registrationErrors[id];
    }
}

export default FormValidationController;
