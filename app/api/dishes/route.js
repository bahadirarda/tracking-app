import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Dish } from '../../utils/models';

const connectMongo = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.DATABASE_URL);
  }
};

export async function GET(request) {
  await connectMongo();
  const dishes = await Dish.find({})
    .populate('menuId') 
  return NextResponse.json(dishes);
}

export async function POST(request) {
  await connectMongo();
  try {
    const req = await request.clone().json();
    const createdDish = await Dish.create(req);
    return NextResponse.json(createdDish);
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
