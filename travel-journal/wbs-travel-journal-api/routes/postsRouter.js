import { Router } from 'express';
import validateZod from '../middlewares/validateZod.js';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/posts.js';
import { postSchema } from '../zod/schemas.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(validateZod(postSchema), createPost);

postsRouter.route('/:id').get(getSinglePost).put(validateZod(postSchema), updatePost).delete(deletePost);

export default postsRouter;
