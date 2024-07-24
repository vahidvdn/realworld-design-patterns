export class OAuthBad {
  constructor() {}

  authenticate(provider: string) {
    switch (provider) {
      case 'Google':
        console.log('Google auth here.');
        break;

      case 'Facebook':
        console.log('Facebook auth here.');
        break;

      case 'Twitter':
        console.log('Twitter auth here.');
        break;

      default:
        throw new Error('Invalid provider');
    }
  }
}

const auth = new OAuthBad()
auth.authenticate('Google')
