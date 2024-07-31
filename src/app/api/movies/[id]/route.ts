import { connect } from '@/dbconfig/db';
import Movie from '@/models/movie.model';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import AWS from 'aws-sdk';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, { params }: Params) => {
  const { id } = params;

  try {
    await connect();
    const post = await Movie.findById(id);

    return NextResponse.json(post);
  } catch (err) {
    throw new Error('Failed to fetch post!');
  }
};

export const PUT = async (request: NextRequest, { params }: Params) => {
  const { id } = params;

  try {
    await connect();
    const body = await request.json();
    const updatedPost = await Movie.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (!updatedPost) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update post!');
  }
};
