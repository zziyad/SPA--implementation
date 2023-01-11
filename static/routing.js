/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

const pathToRegex = (path) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g))
    .map((result) => result[1]);

  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const data = await window.api.auth.signin('marcus', 'marcus');
  const routes = [
    { path: '/', view: '<h1>HOME</h1>' },
    { path: '/posts', view: data },
    // { path: "/posts/:id", view: PostView },
    { path: '/settings', view: '<h1>SETTING</h1>' },
    { path: '/Notfound', view: '<h1>NOT FOUND</h1>' },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => ({
    route,
    result: location.pathname.match(pathToRegex(route.path))
  }));

  let match = potentialMatches.find((potentialMatch) =>
    potentialMatch.result !== null);

  if (!match) {
    match = {
      route: routes[3],
      result: [location.pathname]
    };
  }

  const view = match.route.view;

  document.querySelector('#app').innerHTML = view;
};

export { router, navigateTo };

window.addEventListener('popstate', router);
