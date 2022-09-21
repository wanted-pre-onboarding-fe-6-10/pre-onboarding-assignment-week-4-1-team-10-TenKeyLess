class SessionTokenRepository {
  TOKEN_KEY = 'ACCESS_TOKEN';

  save(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  get() {
    sessionStorage.getItem(this.TOKEN_KEY);
  }

  remove() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}

export default SessionTokenRepository;
