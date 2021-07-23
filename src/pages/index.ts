import 'regenerator-runtime/runtime';
import Router from '../modules/router';
import AuthController from '../controllers/AuthController';

import Login from './login';
import Registration from './registration';
import Messenger from './messenger';
import NotFound from './404';
import ServerError from './500';

const authController = new AuthController();
const router = Router.getInstance();

router
  .use('/login', Login)
  .use('/registration', Registration)
  .use('/messenger', Messenger)
  .use('/not-found', NotFound)
  .use('/server-error', ServerError);

authController.checkAuth();
