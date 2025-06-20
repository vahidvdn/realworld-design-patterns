import { FacebookAuth, GoogleAuth, LinkedInAuth } from "../strategy-pattern/providers";
import { AuthType } from "./factory-method";

let userInput: AuthType; // user can send anything

userInput = 'Google'; // This is just a placeholder. In practice, this would come from user input.
let auth;
switch (userInput) {
  case 'Google':
    auth = new GoogleAuth();
    break;
  // @ts-expect-error
  case 'Facebook':
    auth = new FacebookAuth();
    break;
  // @ts-expect-error
  case 'LinkedIn':
    auth = new LinkedInAuth();
    break;
  default:
    throw new Error('Unsupported authentication type');
}

auth.authenticate();
console.log('❌ Bad practice: Need to repeat this logic in every where.')

