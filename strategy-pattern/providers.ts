import { IOAuth } from "./interfaces";


export class GoogleAuth implements IOAuth {
  authenticate() {
    console.log('Perform an http call to Google');
    console.log('Do your stuff here');
  }
}

export class FacebookAuth implements IOAuth {
  authenticate() {
    console.log('Perform an http call to Facebook');
    console.log('Do your stuff here');
  }
}

export class LinkedInAuth implements IOAuth {
  authenticate() {
    console.log('Perform an http call to LinkedIn');
    console.log('Do your stuff here');
  }
}