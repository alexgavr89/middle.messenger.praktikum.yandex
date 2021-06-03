import { Route } from '../route';
import { Block } from '../block';

export default class Router {
	private static instance: Router;

	private routes: Route[];

	private history: History;

	private currentRoute: Route | null;

	private constructor(private rootQuery?: string) {
		this.routes = [];
		this.history = window.history;
		this.currentRoute = null;

		Router.instance = this;
	}

	static getInstance(rootQuery = 'body'): Router {
		if (!Router.instance) {
			Router.instance = new Router(rootQuery);
		}

		return Router.instance;
	}

	use(pathname: string, view: typeof Block): Router {
		const route = new Route(pathname, view, { rootQuery: this.rootQuery });
		this.routes.push(route);

		return this;
	}

	start(pathname: string): void {
		window.onpopstate = (event) => {
			this.onRoute(event.currentTarget.location.pathname);
		};

		this.onRoute(pathname);
	}

	protected onRoute(pathname: string): void {
		const route = this.getRoute(pathname);

		if (route) {
			if (this.currentRoute) {
				this.currentRoute.leave();
			}

			this.currentRoute = route;

			route.render();
		}
	}

	go(pathname: string): void {
		this.history.pushState({}, '', pathname);
		this.onRoute(pathname);
	}

	back(): void {
		this.history.back();

		setTimeout(() => {
			this.onRoute(window.location.pathname);
		}, 50);
	}

	forward(): void {
		this.history.forward();

		setTimeout(() => {
			this.onRoute(window.location.pathname);
		}, 50);
	}

	getRoute(pathname: string): Route {
		return this.routes.find((route) => route.match(pathname));
	}
}
