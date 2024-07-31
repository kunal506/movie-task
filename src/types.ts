export interface IAddEditMovie {
  id?: string;
  title?: string;
  publishing_year?: string;
  file?: File | string | null;
  preview?: string | null;
}

export interface AddEditMovieProps {
  movieId?: string;
}
