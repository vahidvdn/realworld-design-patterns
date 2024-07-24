import { OAuthBad } from "./bad-practice"

describe('Strategy Pattern bad practice', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate with Google', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const auth = new OAuthBad()
    auth.authenticate('Google')
    expect(consoleSpy).toHaveBeenCalledWith('Google auth here.');
    expect(consoleSpy).not.toHaveBeenCalledWith('Facebook auth here.');
    expect(consoleSpy).not.toHaveBeenCalledWith('Twitter auth here.');
  })

  it('should authenticate with Facebook', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const auth = new OAuthBad()
    auth.authenticate('Facebook')
    expect(consoleSpy).toHaveBeenCalledWith('Facebook auth here.');
    expect(consoleSpy).not.toHaveBeenCalledWith('Google auth here.');
    expect(consoleSpy).not.toHaveBeenCalledWith('Twitter auth here.');
  })

  it('should authenticate with Twitter', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const auth = new OAuthBad()
    auth.authenticate('Twitter')
    expect(consoleSpy).toHaveBeenCalledWith('Twitter auth here.');
    expect(consoleSpy).not.toHaveBeenCalledWith('Google auth here.');
    expect(consoleSpy).not.toHaveBeenCalledWith('Facebook auth here.');
  })

  it('should throw error with unknow provider', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const auth = new OAuthBad()
    const unknown = () => auth.authenticate('unknown')
    expect(unknown).toThrow('Invalid provider')
  })
})
