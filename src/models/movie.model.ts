import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  publishYear: string;
  image: string;
}

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Movie =
  mongoose.models.Movie || mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;
