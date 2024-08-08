import { PostData} from './interface';
import { makePostRequest } from './request';

const data: PostData = {
  title: 'test title',
  body: 'title description',
};

makePostRequest(data);
