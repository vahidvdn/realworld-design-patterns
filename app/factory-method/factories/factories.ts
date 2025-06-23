import { IOAuth } from "../../strategy-pattern/interfaces";
import { FacebookAuth, GoogleAuth, LinkedInAuth } from "../../strategy-pattern/providers";
import { AuthenticationFactory } from "./authentication-factory";

export class GoogleAuthFactory extends AuthenticationFactory {
  createAuthentication(): IOAuth {
    return new GoogleAuth();
  }
}

export class FacebookAuthFactory extends AuthenticationFactory {
  createAuthentication(): IOAuth {
    return new FacebookAuth();
  }
}

export class LinkedInAuthFactory extends AuthenticationFactory {
  createAuthentication(): IOAuth {
    return new LinkedInAuth();
  }
}
