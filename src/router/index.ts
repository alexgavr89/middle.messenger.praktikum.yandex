import AuthController from '../controllers/AuthController';

export default class Router {
    private authController;

    constructor() {
        this.authController = new AuthController();
    }

    init(page: string) {
        if (page === 'index.html') {
            this.authController.login();
        }

        if (page === 'registration.html') {
            this.authController.registration();
        }
    }
}
