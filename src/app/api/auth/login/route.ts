import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connect } from '@/dbconfig/db';

connect();

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string,
      {
        expiresIn: '1h',
      }
    );

    const response = NextResponse.json({
      message: 'Login successfully',
      success: true,
    });

    response.headers.set(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=3600`
    );

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
