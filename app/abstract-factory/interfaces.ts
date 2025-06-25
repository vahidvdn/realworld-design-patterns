import { IOAuth as AuthStrategy } from "../strategy-pattern/interfaces";

export interface PostStrategy {
  createPost(content: string): Promise<void>;
}

export interface SocialNetworkFactory {
  createAuthStrategy(): AuthStrategy;
  createPostStrategy(): PostStrategy;
}
