import { IOAuth } from "../strategy-pattern/interfaces";
import { FacebookAuth, GoogleAuth, LinkedInAuth } from "../strategy-pattern/providers";

export type AuthType = 'Google' | 'Facebook' | 'LinkedIn';

export class AuthenticationFactory {
  static createAuthentication(type: AuthType): IOAuth {
    switch (type) {
      case 'Google':
        return new GoogleAuth();
      case 'Facebook':
        return new FacebookAuth();
      case 'LinkedIn':
        return new LinkedInAuth();
      default:
        throw new Error('Unsupported authentication type');
    }
  }
}

const typeUserInput: AuthType = 'Google'; // Change this to 'Facebook' or 'LinkedIn' to test other providers
const authProvider = AuthenticationFactory.createAuthentication(typeUserInput);
authProvider.authenticate();
