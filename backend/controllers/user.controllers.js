import { json } from 'zod/v4';
import { Book, User } from '../models/index.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user });
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('readingList.bookRefId');
  if (!user) throw new ErrorResponse('User not found', 404);
  res.json({ data: user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true }); // , upsert: true
  if (!user) throw new ErrorResponse('User not found', 404);
  res.json({ data: user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse('User not found', 404);
  res.json({ data: user });
};

const addBookToReadingList = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  const bookExists = await Book.exists({ _id: bookId });
  if (!bookExists) throw new ErrorResponse('Book not in the library', 404);

  const user = await User.findById(userId);
  if (!user) throw new ErrorResponse('User not found', 404);

  const bookOnListAlready = user.readingList.find((book) => book.bookRefId.toString() === bookId);
  if (bookOnListAlready) {
    throw new ErrorResponse('Book on list already', 409);
  }

  user.readingList.push({ bookRefId: bookId });

  await user.save();

  res.json({ message: 'Added book to reading list', data: user });
};

const updateBookStatus = async (req, res) => {
  const { userId, bookId } = req.params;
  const { status } = req.body;

  const bookExists = await Book.exists({ _id: bookId });
  if (!bookExists) throw new ErrorResponse('Book not in the library', 404);

  const user = await User.findOneAndUpdate(
    { _id: userId, 'readingList.bookRefId': bookId },
    { $set: { 'readingList.$.status': status } },
    { new: true }
  );
  if (!user) throw new ErrorResponse('User not found', 404);

  res.json({ message: 'Book status updated', data: user });
};

const deleteBookFromReadingList = async (req, res) => {
  const { userId, bookId } = req.params;

  const user = await User.findByIdAndUpdate(userId, { $pull: { readingList: { bookRefId: bookId } } }, { new: true });

  if (!user) throw new ErrorResponse('User not found', 404);

  res.json({ message: 'Removed book from reading list', data: user });
};

export {
  getAllUsers,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
  addBookToReadingList,
  updateBookStatus,
  deleteBookFromReadingList,
};
