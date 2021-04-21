import AuthController from '../controllers/AuthController';

function route() {
    const hash = document.location.hash.slice(1);

    const authController = new AuthController();

    const app = document.querySelector('.app');

    if (hash !== '' && app !== null) {
        app.remove();
    }

    if (hash === 'login' || hash === '') {
        authController.login();
    }

    if (hash === 'registration') {
        authController.registration();
    }
}

export default function () {
    addEventListener('hashchange', route);
    route();
}
