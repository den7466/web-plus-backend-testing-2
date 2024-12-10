import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    let mockedPostsWithId: Post[] = [];
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
      let id = 1;
      mockedPostsWithId = posts.map(item => {
        const stringId = id.toString();
        const postWithId = {...item, id: stringId};
        id++;
        return postWithId;
      });
    });

    it('should return all posts if called without options', () => {
      expect(postsService.findMany()).toEqual(mockedPostsWithId);
    });

    it('should return correct posts for skip and limit options', () => {
      const sliceData = mockedPostsWithId.slice(1);
      const limitData = sliceData.slice(0, 2);
      expect(postsService.findMany({ skip: 1, limit: 2 })).toEqual(limitData);
    });
  });
});