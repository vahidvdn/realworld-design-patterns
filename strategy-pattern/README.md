## ❌ Bad Practice

```ts
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
```

## ✅ Good Practice

```ts
class OAuth {
  constructor(
    private googleAuth: GoogleAuth,
    private facebookAuth: FacebookAuth,
    private linkedInAuth: LinkedInAuth,
  ) {}

  authenticate(provider: Provider) {
    this[`${provider}Auth`].authenticate()
  }
}

const google = new GoogleAuth();
const facebook = new FacebookAuth();
const linkedIn = new LinkedInAuth();

const oauth = new OAuth(google, facebook, linkedIn);
oauth.authenticate('facebook');
```