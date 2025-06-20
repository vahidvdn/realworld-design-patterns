import { AuthenticationFactory } from './factory-method';
import { GoogleAuth, FacebookAuth, LinkedInAuth } from '../strategy-pattern/providers';

describe('AuthenticationFactory', () => {
  it('should create a GoogleAuth instance for type "Google"', () => {
    const auth = AuthenticationFactory.createAuthentication('Google');
    expect(auth).toBeInstanceOf(GoogleAuth);
  });

  it('should create a FacebookAuth instance for type "Facebook"', () => {
    const auth = AuthenticationFactory.createAuthentication('Facebook');
    expect(auth).toBeInstanceOf(FacebookAuth);
  });

  it('should create a LinkedInAuth instance for type "LinkedIn"', () => {
    const auth = AuthenticationFactory.createAuthentication('LinkedIn');
    expect(auth).toBeInstanceOf(LinkedInAuth);
  });

  it('should throw an error for unsupported authentication type', () => {
    // @ts-expect-error we're intentionally passing an invalid value
    expect(() => AuthenticationFactory.createAuthentication('Twitter')).toThrow(
      'Unsupported authentication type'
    );
  });
});
