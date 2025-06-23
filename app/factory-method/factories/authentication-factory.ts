import { IOAuth } from "../../strategy-pattern/interfaces";

export abstract class AuthenticationFactory {
  abstract createAuthentication(): IOAuth;

  authenticate(): void {
    const auth = this.createAuthentication();
    auth.authenticate();
  }
}
