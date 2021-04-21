import Router from "../router";

const pages = document.location.pathname.slice(1);
const router = new Router();
router.init(pages);
