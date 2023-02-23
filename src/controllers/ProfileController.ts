interface ProfileControllerInterface {
    validate: (data: string, id: keyof typeof REGEXES) => string | null;
}

interface RegInterface {
    email: RegExp;
    login: RegExp;
    firstName: RegExp;
    secondName: RegExp;
    phone: RegExp;
    password: RegExp;
    passwordRepeat: any;
}

const ERRORS = {
    email: 'Что-то пошло не так',
    login: 'RegExp',
    firstName: 'RegExp',
    secondName: 'RegExp',
    phone: 'RegExp',
    password: 'RegExp',
    passwordRepeat: "any",
}

const REGEXES: RegInterface = {
    email: /^((?!\.)[\w,-,_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
    login: /^[a-zA-Z0-9\\-\\_]{6,16}$/,
    firstName: /^[[a-z][A-Z][а-я][А-Я][0-9][-,_]]+$/,
    secondName: /^[a-zA-Zа-яА-Я\\-]+$/,
    phone: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$/,
    password: /^[a-zA-Z0-9\\-\\_]{6,16}$/,
    passwordRepeat: ""
};

class ProfileController implements ProfileControllerInterface {

    validate(data: string, id: keyof typeof REGEXES) {
        const result = REGEXES[id].test(data);
        console.log('data', data);
        console.log('id', id);
        console.log('result', result);
        return result ? null : ERRORS[id]
    }
}

export default ProfileController;
