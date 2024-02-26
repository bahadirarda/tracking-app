import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Customer } from '../../utils/models'; // Yolunuzun projenizin yapısına uygun olduğundan emin olun.

// MongoDB'ye bağlan
const connectMongo = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.DATABASE_URL);
  }
};

export async function GET(request) {
  await connectMongo();
  const customers = await Customer.find({});
  return NextResponse.json(customers);
}

export async function POST(request) {
  await connectMongo();
  try {
    const req = await request.clone().json();
    const createdCustomer = await Customer.create(req);
    return NextResponse.json(createdCustomer);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Müşteri oluşturulamadı." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
