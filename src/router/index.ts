import AuthController from '../controllers/AuthController';

function route() {
    const hash = location.hash.slice(1);

    const authController = new AuthController();

    console.log(hash);
    if (hash !== '') {
        document.querySelector('.app').remove();
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
