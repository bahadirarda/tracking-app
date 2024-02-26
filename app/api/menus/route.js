import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Menu } from '../../utils/models';

// MongoDB'ye bağlan
const connectMongo = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.DATABASE_URL);
  }
};

export async function GET(request) {
  await connectMongo();
  const menus = await Menu.find({})
    .populate('dishes') 
    .populate('serveDates');
  return NextResponse.json(menus);
}

export async function POST(request) {
  await connectMongo();
  try {
    const req = await request.clone().json();
    const createdMenu = await Menu.create(req);
    return NextResponse.json(createdMenu);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Menü oluşturulamadı." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
