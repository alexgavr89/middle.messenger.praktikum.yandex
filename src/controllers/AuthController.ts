import loginPage from '../pages/login';
import registrationPage from '../pages/registration';

export default class AuthController {
    login(): void {
        // вызов модели

        loginPage();
    }

    registration(): void {
        // вызов модели

        registrationPage();
    }
}
