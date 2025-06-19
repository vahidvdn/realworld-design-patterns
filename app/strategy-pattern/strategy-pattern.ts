/**
 * Task: Implement oauth with mutiple providers,
 * e.g. Google, Facebook, LinkedIn
 */

import { IOAuth, Provider } from "./interfaces"
import { FacebookAuth, GoogleAuth, LinkedInAuth } from "./providers"

export class OAuthContext {
  private strategy: IOAuth;

  constructor() {}

  setStrategy(strategy: IOAuth) {
    this.strategy = strategy;
  }

  authenticate() {
    if (!this.strategy) {
      throw new Error("Authenticate strategy not set");
    }
    this.strategy.authenticate();
  }
}

const google = new GoogleAuth();
const facebook = new FacebookAuth();
// const linkedIn = new LinkedInAuth();

const oauthContext = new OAuthContext();
oauthContext.setStrategy(google);
oauthContext.authenticate();

oauthContext.setStrategy(facebook);
oauthContext.authenticate();
