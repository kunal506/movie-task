import { IAddEditMovie } from '@/types';
import AddEditMovie from '@/components/movies/AddEditMovie';
import { errorToast } from '@/lib/helper';
import { useRouter } from 'next/navigation';

interface EditMoviePageProps {
  params: {
    id: string;
  };
}

const EditMoviePage = async ({ params }: EditMoviePageProps) => {
  return <AddEditMovie movieId={params.id} />;
};

export default EditMoviePage;
