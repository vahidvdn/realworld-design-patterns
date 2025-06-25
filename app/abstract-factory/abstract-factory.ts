import { FacebookFactory, GoogleFactory, LinkedInFactory } from "./factories";

// facebook
const facebookFactory = new FacebookFactory();
const facebookAuth = facebookFactory.createAuthStrategy();
const facebookPost = facebookFactory.createPostStrategy();

facebookAuth.authenticate();
facebookPost.createPost("Hello world");

// google
const googleFactory = new GoogleFactory();
const googleAuth = googleFactory.createAuthStrategy();
const googlePost = googleFactory.createPostStrategy();

googleAuth.authenticate();
googlePost.createPost("Hello world");

// linkedIn
const linkedInFactory = new LinkedInFactory();
const linkedInAuth = linkedInFactory.createAuthStrategy();
const linkedInPost = linkedInFactory.createPostStrategy();

linkedInAuth.authenticate();
linkedInPost.createPost("Hello world");
