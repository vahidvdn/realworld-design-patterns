import { PostData} from './interface';
import { getProducts } from './utils';

const data: PostData = {
  title: 'test title',
  body: 'title description',
};

getProducts(data);



