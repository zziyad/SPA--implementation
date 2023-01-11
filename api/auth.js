({
  // eslint-disable-next-line no-unused-vars
  async signin({ login, password }) {
    console.log({ method: 'auth.signin', login, password });
    // return { status: 'ok', token: '--no-token-provided--' };
    return '<h1>POST FROM API</h1>';
  },

  async signout() {
    console.log({ method: 'auth.signout' });
    return { status: 'ok' };
  },

  async restore({ token }) {
    console.log({ method: 'auth.restore', token });
    return { status: 'ok' };
  },
});
