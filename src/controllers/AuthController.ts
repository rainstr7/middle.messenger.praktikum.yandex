interface AuthControllerInterface {
    validate: (data: string, id: keyof typeof authErrors) => string | null;
}

export const authErrors = {
    login: 'Поле логин не может быть пустым',
    password: 'Поле пароль не может быть пустым'
}

class AuthController implements AuthControllerInterface {
    validate(data: string, id: keyof typeof authErrors) {
        return Boolean(data) ? null : authErrors[id];
    }
}

export default AuthController;
