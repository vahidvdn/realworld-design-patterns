import { PostStrategy, SocialNetworkFactory } from "./interfaces";
import { IOAuth as AuthStrategy } from "../strategy-pattern/interfaces";
import { FacebookAuth, GoogleAuth, LinkedInAuth } from "../strategy-pattern/providers";
import { FacebookPost, GooglePost, LinkedInPost } from "./post-strategies";

export class FacebookFactory implements SocialNetworkFactory {
  createAuthStrategy(): AuthStrategy {
    return new FacebookAuth();
  }

  createPostStrategy(): PostStrategy {
    return new FacebookPost();
  }
}

export class GoogleFactory implements SocialNetworkFactory {
  createAuthStrategy(): AuthStrategy {
    return new GoogleAuth();
  }

  createPostStrategy(): PostStrategy {
    return new GooglePost();
  }
}

export class LinkedInFactory implements SocialNetworkFactory {
  createAuthStrategy(): AuthStrategy {
    return new LinkedInAuth();
  }

  createPostStrategy(): PostStrategy {
    return new LinkedInPost();
  }
}
