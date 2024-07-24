/**
 * Task: Implement oauth with mutiple providers,
 * e.g. Google, Facebook, LinkedIn
 */

import { Provider } from "./interfaces"
import { FacebookAuth, GoogleAuth, LinkedInAuth } from "./providers"

export class OAuth {
  constructor(
    private googleAuth: GoogleAuth,
    private facebookAuth: FacebookAuth,
    private linkedInAuth: LinkedInAuth,
  ) {}

  authenticate(provider: Provider) {
    this[`${provider}Auth`].authenticate()
  }
}

const google = new GoogleAuth();
const facebook = new FacebookAuth();
const linkedIn = new LinkedInAuth();

const oauth = new OAuth(google, facebook, linkedIn);
oauth.authenticate('facebook');
