import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { User } from '../../utils/models';

// MongoDB'ye bağlan
const connectMongo = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.DATABASE_URL);
  }
};

// Kullanıcıları listeleme için GET isteğini işle
export async function GET(request) {
  await connectMongo();
  const users = await User.find({});
  return NextResponse.json(users);
}

// Yeni bir kullanıcı ekleme için POST isteğini işle
export async function POST(request) {
  await connectMongo();
  try {
    const data = await request.json();
    const createdUser = await User.create(data);
    return NextResponse.json(createdUser);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Kullanıcı oluşturulamadı." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
