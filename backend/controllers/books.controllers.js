import { Book } from '../models/index.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json({ data: books });
};

const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ data: book });
};

const getOneBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) throw new ErrorResponse('Book not found', 404);
  res.json({ data: book });
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, req.body, { new: true }); // , upsert: true
  if (!book) throw new ErrorResponse('Book not found', 404);
  res.json({ data: book });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);
  if (!book) throw new ErrorResponse('Book not found', 404);
  res.json({ data: book });
};

export { getAllBooks, createBook, getOneBook, updateBook, deleteBook };
