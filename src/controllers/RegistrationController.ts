interface ProfileControllerInterface {
    validate: (data: string, id: keyof typeof registrationErrors) => string | null;
}

interface RegistrationValidateInterface {
    email: RegExp;
    login: RegExp;
    firstName: RegExp;
    secondName: RegExp;
    phone: RegExp;
    password: RegExp;
    passwordRepeat: any;
}

export const registrationErrors = {
    email: 'Введите корректную электронную почту',
    login: 'Введите корректный логин',
    firstName: 'Введите корректное имя',
    secondName: 'Введите корректную фамилию',
    phone: 'Введите корректный номер телефона',
    password: 'Введите корректный пароль',
    passwordRepeat: "Пароли не совпадают",
}

const validationMethods: RegistrationValidateInterface = {
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    login: /^[a-zA-Z](.[a-zA-Z0-9_-]*){2,19}$/,
    firstName: /^([А-Я][а-яё-]{1,23}|[A-Z][a-z-])$/,
    secondName: /^([А-Я][а-яё-]{1,23}|[A-Z][a-z-])$/,
    phone: /^[0-9+][0-9]{9,14}$/,
    password: /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    passwordRepeat: ([firstPassword, secondPassword]: string[]) => firstPassword === secondPassword,
};

class RegistrationController implements ProfileControllerInterface {

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

export default RegistrationController;
