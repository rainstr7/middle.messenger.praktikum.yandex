interface ProfileControllerInterface {
    validate: (data: string) => string | null;
}

class AuthController implements ProfileControllerInterface {
    validate(data: string | null) {
        return !data ? 'Поле не может быть пустым' : null;
    }
}

export default AuthController;
