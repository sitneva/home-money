export class AuthService {
  private isAunthenticated = false;

  login() {
    this.isAunthenticated = true;
  }

  logout() {
    this.isAunthenticated = false;
    window.localStorage.clear();
  }

  isLoggetIn(): boolean {
    return this.isAunthenticated;
  }

}
