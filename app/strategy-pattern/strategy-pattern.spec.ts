import { OAuthContext } from "./strategy-pattern"

describe('Strategy Pattern', () => {
  const mockGoogleAuth = {
    authenticate: jest.fn(() => console.log('Perform an http call to google'))
  }
  const mockFacebookAuth = {
    authenticate: jest.fn(() => console.log('Perform an http call to facebook'))
  }
  const mockLinkedInAuth = {
    authenticate: jest.fn(() => console.log('Perform an http call to linkedin'))
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate google', () => {
    const oauth = new OAuthContext()
    oauth.setStrategy(mockGoogleAuth)
    oauth.authenticate()
    expect(mockGoogleAuth.authenticate).toHaveBeenCalledTimes(1);
  })

  it('should authenticate facebook', () => {
    const oauth = new OAuthContext()
    oauth.setStrategy(mockFacebookAuth)
    oauth.authenticate()
    expect(mockFacebookAuth.authenticate).toHaveBeenCalledTimes(1);
    expect(mockGoogleAuth.authenticate).toHaveBeenCalledTimes(0);
  })

  it('should authenticate linkedin', () => {
    const oauth = new OAuthContext()
    oauth.setStrategy(mockLinkedInAuth)
    oauth.authenticate()
    expect(mockLinkedInAuth.authenticate).toHaveBeenCalledTimes(1);
    expect(mockFacebookAuth.authenticate).toHaveBeenCalledTimes(0);
    expect(mockGoogleAuth.authenticate).toHaveBeenCalledTimes(0);
  })
})
