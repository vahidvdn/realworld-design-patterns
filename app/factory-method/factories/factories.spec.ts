

import { GoogleAuth, FacebookAuth, LinkedInAuth } from "../../strategy-pattern/providers";
import { FacebookAuthFactory, GoogleAuthFactory, LinkedInAuthFactory } from "./factories";


// We want to mock the dependencies of the factories
jest.mock('../../strategy-pattern/providers', () => {
  return {
    GoogleAuth: jest.fn().mockImplementation(() => ({
      authenticate: jest.fn(),
    })),
    FacebookAuth: jest.fn().mockImplementation(() => ({
      authenticate: jest.fn(),
    })),
    LinkedInAuth: jest.fn().mockImplementation(() => ({
      authenticate: jest.fn(),
    })),
  };
});

describe('AuthenticationFactory', () => {
  let googleAuthFactory: GoogleAuthFactory;
  let facebookAuthFactory: FacebookAuthFactory;
  let linkedInAuthFactory: LinkedInAuthFactory;

  beforeEach(() => {
    googleAuthFactory = new GoogleAuthFactory();
    facebookAuthFactory = new FacebookAuthFactory();
    linkedInAuthFactory = new LinkedInAuthFactory();
  });

  it('should create a GoogleAuth instance', () => {
    const auth = googleAuthFactory.authenticate();
    expect(GoogleAuth).toHaveBeenCalled();
    const instance = (GoogleAuth as jest.Mock).mock.results[0].value;
    expect(instance.authenticate).toHaveBeenCalled();
  });

  it('should create a FacebookAuth instance', () => {
    const auth = facebookAuthFactory.authenticate();
    expect(FacebookAuth).toHaveBeenCalled();
    const instance = (FacebookAuth as jest.Mock).mock.results[0].value;
    expect(instance.authenticate).toHaveBeenCalled();
  });

  it('should create a LinkedInAuth instance', () => {
    const auth = linkedInAuthFactory.authenticate();
    expect(LinkedInAuth).toHaveBeenCalled();
    const instance = (LinkedInAuth as jest.Mock).mock.results[0].value;
    expect(instance.authenticate).toHaveBeenCalled();
  });
});
