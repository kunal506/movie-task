import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MovieBox = ({ movie }: any) => {
  const router = useRouter();
  return (
    <div
      className="h-[504px] px-8 pt-8 pb-16 cursor-pointer bg-card hover:bg-card-hover rounded-xl border border-white"
      onClick={() => router.push(`/edit-movie/${movie._id}`)}
    >
      <Image
        src={movie?.image || ''}
        alt="Movie Box"
        width={100}
        height={100}
        className="object-cover h-full w-full max-h-[400px] rounded-xl"
      />
      <div className="mt-16 px-8">
        <p className="text-body-large font-bold sm:font-semibold">
          {movie.title}
        </p>
        <p className="text-body-small mt-8">{movie.publishYear}</p>
      </div>
    </div>
  );
};

export default MovieBox;
