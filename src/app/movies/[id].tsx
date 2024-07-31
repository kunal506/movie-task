import { GetServerSideProps } from 'next';
import AddEditMovie from '@/components/movies/AddEditMovie';
import { IAddEditMovie } from '@/types';
import { FC } from 'react';

interface EditMoviePageProps {
  movie: IAddEditMovie;
}

export const getServerSideProps: GetServerSideProps<
  EditMoviePageProps
> = async (context) => {
  const { id } = context.params as { id: string };

  const response = await fetch(`https://api.example.com/movies/${id}`);
  const movie: IAddEditMovie = await response.json();

  return {
    props: {
      movie,
    },
  };
};

const EditMoviePage: FC<EditMoviePageProps> = ({ movie }) => {
  return <AddEditMovie movie={movie} />;
};

export default EditMoviePage;
