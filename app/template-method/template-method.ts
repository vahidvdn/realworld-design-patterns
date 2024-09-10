import { AlibabaHandler, AmazonHandler } from "./implemtations";
import { PostData } from "./interface";

const postData: PostData = {
  title: 'test title',
  body: 'title description',
};

async function bootstrap() {
  const amazon = new AmazonHandler();
  const amazonResult = await amazon.handle(postData);
  console.log('amazonResult: ', amazonResult);


  const alibaba = new AlibabaHandler();
  const alibabResult = await alibaba.handle(postData);
  console.log('alibabResult: ', alibabResult);
}

bootstrap()
