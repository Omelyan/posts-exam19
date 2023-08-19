import type { Post } from '../redux/types';

export { PostListScreen } from './PostList';
export { PostScreen } from './Post';
export { rootStackNavigationOptions } from './options';

export type RootStackParamList = {
  PostList: undefined;
  Post: Post;
};
