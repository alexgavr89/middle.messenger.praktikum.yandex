import loginPage from '../pages/login';
import registrationPage from '../pages/registration';

export default class AuthController {
    login() {
        // вызов модели

        loginPage();
    }

    registration() {
        // вызов модели

        registrationPage();
    }
};
