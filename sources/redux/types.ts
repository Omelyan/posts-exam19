import store from './store';

export type Post = {
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  id: number;
  postId: number;
  text: string;
};

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export type TypedUseDispatchHook = () => StoreDispatch;
