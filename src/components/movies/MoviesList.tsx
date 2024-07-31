'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MovieBox from './MovieBox';
import { useRouter } from 'next/navigation';
import EmptyMoviesList from './EmptyMoviesList';
import Loader from '../common/Loader';
import { clearCookie } from '@/lib/action';

const MoviesList = () => {
  const router = useRouter();

  const [moviesList, setMoviesList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchMovie = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/movies?page=${page}&limit=8`);

      if (!response.ok) {
        setMoviesList([]);
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data?.data?.length > 0) {
        setMoviesList(data.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        setMoviesList([]);
      }
    } catch (error) {
      setMoviesList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await clearCookie();
    router.push('/login');
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchMovie(newPage);
  };

  useEffect(() => {
    fetchMovie(page);
  }, [page]);

  return loading ? (
    <Loader />
  ) : moviesList?.length > 0 && !loading ? (
    <div className="w-full py-120">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="md:text-heading-two text-heading-three font-semibold">
            My movies
          </h2>
          <Image
            src="/images/add-icon.svg"
            alt="Add Icon"
            width={26}
            height={26}
            className="mt-[8px] cursor-pointer"
            onClick={() => router.push('/create-movie')}
          />
        </div>

        <div
          className="flex items-center gap-[16px] cursor-pointer"
          onClick={() => handleLogout()}
        >
          <p className="text-body-regular font-bold hidden md:block">Logout</p>
          <Image
            src="/images/logout-icon.svg"
            alt="Logout Icon"
            width={26}
            height={26}
          />
        </div>
      </div>

      <div className="mt-120">
        <div className="grid grid-cols-12 sm:gap-24 gap-5">
          {moviesList.map((item, index) => (
            <div className="xl:col-span-3 md:col-span-4 col-span-6" key={index}>
              <MovieBox movie={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-120">
        <div className="text-center flex items-center justify-center gap-[16px]">
          {page > 1 && (
            <p
              className="text-body-regular font-bold cursor-pointer"
              onClick={() => handlePageChange(page - 1)}
            >
              Prev
            </p>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <div
                key={pageNumber}
                className={`h-[32px] w-[32px] ${
                  page === pageNumber ? 'bg-primary' : 'bg-card'
                } text-white rounded flex justify-center items-center cursor-pointer`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </div>
            )
          )}
          {page < totalPages && (
            <p
              className="text-body-regular font-bold cursor-pointer"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <EmptyMoviesList />
  );
};

export default MoviesList;
