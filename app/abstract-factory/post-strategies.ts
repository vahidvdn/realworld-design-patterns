import { PostStrategy } from "./interfaces";

export class FacebookPost implements PostStrategy {
  async createPost(content: string) {
    console.log(`Posting to Facebook: ${content}`);
  }
}

export class GooglePost implements PostStrategy {
  async createPost(content: string) {
    console.log(`Posting to Google: ${content}`);
  }
}

export class LinkedInPost implements PostStrategy {
  async createPost(content: string) {
    console.log(`Posting to linkedIn: ${content}`);
  }
}
