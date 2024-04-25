class OAuthBad {
  constructor() {}

  authenticate(provider: string) {
    switch (provider) {
      case 'Google':
        console.log('Perform an http call to Google');
        console.log('Do your stuff here');
      
      case 'Facebook':
        console.log('Perform an http call to Facebook');
        console.log('Do your stuff here');
        break;
      
      case 'Twitter':
        console.log('Perform an http call to Twitter');
        console.log('Do your stuff here');
        break;
    
      default:
        break;
    }
  }
}

const auth = new OAuthBad()
auth.authenticate('Google')