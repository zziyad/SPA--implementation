
class Routing {
  #routing;
  constructor() {
    this.#routing = null;
    this.match = null;
  }

  async init() {
    await this.getRoutes();
    this.match = this.potentialMatches().find((potentialMatche) =>
      potentialMatche.result !== null);
    if (!this.match) {
      this.match = {
        route: this.#routing[3],
        result: [location.pathname],
      };
    }
    this.view = this.match.route.view;
    document.querySelector('#app').innerHTML = this.view;
  }

  pathToRegex(path) {
    return new RegExp('^' + path
      .replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

  }

  potentialMatches() {
    return this.#routing.map((route) => ({
      route,
      result: location.pathname.match(this.pathToRegex(route.path))
    }));
  }

  async getRoutes() {
    const data = await window.api.auth.signout();

    return this.#routing = [
      { path: '/', view: '<h1>HOME</h1>' },
      { path: '/posts', view: data },
      // { path: "/posts/:id", view: PostView },
      { path: '/settings', view: '<h1>SETTING</h1>' },
      { path: '/Notfound', view: '<h1>NOT FOUND</h1>' },
    ];
  }
}

const rout = new Routing();

window.addEventListener('popstate', rout.init());
export { rout };

