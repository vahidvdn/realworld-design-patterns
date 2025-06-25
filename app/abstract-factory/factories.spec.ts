import { GoogleAuth, FacebookAuth, LinkedInAuth } from "../strategy-pattern/providers";
import { GooglePost, FacebookPost, LinkedInPost } from "./post-strategies";
import { FacebookFactory, GoogleFactory, LinkedInFactory } from "./factories";

// We want to mock the dependencies of the factories
jest.mock('../strategy-pattern/providers', () => {
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

jest.mock('./post-strategies', () => {
  return {
    FacebookPost: jest.fn().mockImplementation(() => ({
      createPost: jest.fn(),
    })),
    GooglePost: jest.fn().mockImplementation(() => ({
      createPost: jest.fn(),
    })),
    LinkedInPost: jest.fn().mockImplementation(() => ({
      createPost: jest.fn(),
    })),
  };
});

describe('SocialNetworkFactory', () => {
  describe('FacebookFactory', () => {
    let facebookFactory: FacebookFactory;

    beforeEach(() => {
      facebookFactory = new FacebookFactory();
    });

    it('should create a FacebookAuth instance', () => {
      const auth = facebookFactory.createAuthStrategy();
      expect(FacebookAuth).toHaveBeenCalled();
      expect(auth.authenticate).toBeDefined();
    });

    it('should create a FacebookPost instance', () => {
      const post = facebookFactory.createPostStrategy();
      expect(FacebookPost).toHaveBeenCalled();
      expect(post.createPost).toBeDefined();
    });
  });

  describe('GoogleFactory', () => {
    let googleFactory: GoogleFactory;

    beforeEach(() => {
      googleFactory = new GoogleFactory();
    });

    it('should create a GoogleAuth instance', () => {
      const auth = googleFactory.createAuthStrategy();
      expect(GoogleAuth).toHaveBeenCalled();
      expect(auth.authenticate).toBeDefined();
    });

    it('should create a GooglePost instance', () => {
      const post = googleFactory.createPostStrategy();
      expect(GooglePost).toHaveBeenCalled();
      expect(post.createPost).toBeDefined();
    });
  });

  describe('LinkedInFactory', () => {
    let linkedInFactory: LinkedInFactory;

    beforeEach(() => {
      linkedInFactory = new LinkedInFactory();
    });

    it('should create a LinkedInAuth instance', () => {
      const auth = linkedInFactory.createAuthStrategy();
      expect(LinkedInAuth).toHaveBeenCalled();
      expect(auth.authenticate).toBeDefined();
    });

    it('should create a LinkedInPost instance', () => {
      const post = linkedInFactory.createPostStrategy();
      expect(LinkedInPost).toHaveBeenCalled();
      expect(post.createPost).toBeDefined();
    });
  });
});
