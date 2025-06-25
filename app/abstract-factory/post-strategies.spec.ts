import { FacebookPost, GooglePost, LinkedInPost } from "./post-strategies";

describe('PostStrategy', () => {
  it('should create facebookpost', async () => {
    const facebook = new FacebookPost();
    const result = await facebook.createPost('Hello, Facebook!');
    expect(result).toBeUndefined(); // Since createPost does not return anything
  });

  it('should create googlepost', async () => {
    const google = new GooglePost();
    const result = await google.createPost('Hello, Google!');
    expect(result).toBeUndefined(); // Since createPost does not return anything
  });

  it('should create linkedInPost', async () => {
    const linkedIn = new LinkedInPost();
    const result = await linkedIn.createPost('Hello, LinkedIn!');
    expect(result).toBeUndefined(); // Since createPost does not return anything
  });
})
