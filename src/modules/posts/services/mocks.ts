import { Post } from '../entities/post.entity';

export const createdPost: Post = {
  id: '1',
  title: 'test title',
  content: 'test content',
  likes: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: '1',
    age: 20,
    email: '',
    createdAt: new Date(),
    fullName: 'test user',
    updatedAt: new Date(),
    password: 'test password',
    posts: [],
  },
};
export const expectedPosts: Post[] = [
  createdPost,
  {
    id: '2',
    title: 'test title 2',
    content: 'test content 2',
    likes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: '2',
      age: 25,
      email: '',
      createdAt: new Date(),
      fullName: 'test user 2',
      updatedAt: new Date(),
      password: 'test password 2',
      posts: [],
    },
  },
];
