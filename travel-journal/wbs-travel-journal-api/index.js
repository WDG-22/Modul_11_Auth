import './db/index.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postsRouter from './routes/postsRouter.js';
import authRouter from './routes/auth.router.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json(), cookieParser());

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.use('*splat', (req, res) => res.status(404).json({ error: 'Not found' }));
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
