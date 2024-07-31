import { connect } from '@/dbconfig/db';
import Movie from '@/models/movie.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    await connect();

    const movies = await Movie.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const totalMovies = await Movie.countDocuments({});
    const totalPages = Math.ceil(totalMovies / limit);

    const response = NextResponse.json({
      message: 'Get all movies successfully',
      success: true,
      data: movies,
      pagination: {
        totalItems: totalMovies,
        totalPages: totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, publishYear, image } = reqBody;

    const newMovie = await Movie.create({
      title,
      publishYear,
      image,
    });

    const response = NextResponse.json({
      message: 'create movie successful',
      success: true,
      data: newMovie,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
