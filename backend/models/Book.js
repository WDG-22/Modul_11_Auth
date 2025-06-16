import { Schema, model } from 'mongoose';
import { isbnPattern } from '../utils/index.js';

const bookSchema = new Schema({
  author: {
    type: String,
    maxLength: 500,
  },
  title: {
    type: String,
    maxLength: 500,
  },
  description: {
    type: String,
    maxLength: 10000,
  },
  pageNumber: Number,
  year: {
    type: Number,
    min: -2000,
    max: 3000,
  },
  isbn: {
    type: String,
    unique: true,
    match: [isbnPattern, 'Please provide a valid ISBN'],
  },
  genre: [{ type: String, maxLength: 50 }],
});

const Book = model('book', bookSchema);
export default Book;
