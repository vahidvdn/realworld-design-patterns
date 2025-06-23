import { GoogleAuthFactory, FacebookAuthFactory, LinkedInAuthFactory } from "./factories/factories";

const googleFactory = new GoogleAuthFactory();
googleFactory.authenticate();

const facebookFactory = new FacebookAuthFactory();
facebookFactory.authenticate();

const linkedInFactory = new LinkedInAuthFactory();
linkedInFactory.authenticate();

