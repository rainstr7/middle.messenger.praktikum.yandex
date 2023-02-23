interface AuthControllerInterface {
    validate: (data: string) => string | null;
}

class AuthController implements AuthControllerInterface {
    validate(data: string | null) {
        return Boolean(data) ? null : 'Поле не может быть пустым';
    }
}

export default AuthController;
