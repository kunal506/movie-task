'use client';
import React from 'react';
import Button from '@/components/common/button';
import { useRouter } from 'next/navigation';

const EmptyMoviesList = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="text-center">
        <h2 className="md:text-heading-two text-heading-three font-semibold">
          Your movie list is empty
        </h2>

        <div className="mt-10">
          <Button
            type="button"
            className="w-auto"
            onClick={() => router.push('/create-movie')}
          >
            Add a new movie
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyMoviesList;
