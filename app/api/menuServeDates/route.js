import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { MenuServeDate } from '../../utils/models'; 

const connectMongo = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.DATABASE_URL);
  }
};

export async function GET(request) {
  await connectMongo();
  const menuServeDates = await MenuServeDate.find({})
    .populate('menuId')
    .populate('customerId');
  return NextResponse.json(menuServeDates);
}

export async function POST(request) {
  await connectMongo();
  try {
    const req = await request.json(); 
    const createdMenuServeDate = await MenuServeDate.create(req);
    return NextResponse.json(createdMenuServeDate);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "MenuServeDate oluşturulamadı." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}


export async function PUT(request) {
  await connectMongo();
  try {
    const { id, ...data } = await request.json();
    const updatedMenuServeDate = await MenuServeDate.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updatedMenuServeDate);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "MenuServeDate güncellenemedi." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Örnek DELETE işleyicisi
export async function DELETE(request) {
  await connectMongo();
  try {
    const { id } = await request.json();
    await MenuServeDate.findByIdAndDelete(id);
    return NextResponse.json({ message: "MenuServeDate başarıyla silindi." });
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "MenuServeDate silinemedi." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
