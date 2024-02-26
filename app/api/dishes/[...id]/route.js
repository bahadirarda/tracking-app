import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Dish } from '../../../utils/models'; // Menu modelinizin yolu projenize göre değiştirilmelidir.

const connectMongo = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.DATABASE_URL);
  }
};
export async function GET(request) {
  await connectMongo();
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop(); 

  try {
    const dish = await Dish.findById(id);
    if (!dish) {
      return new Response(JSON.stringify({ error: "Yemek bulunamadı." }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return NextResponse.json(dish);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Yemek getirilirken bir hata oluştu." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}



export async function PUT(request) {
  await connectMongo();
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();
  try {
    const data = await request.json();
    const updatedDish = await Dish.findByIdAndUpdate(id, data, { new: true }).populate('menuId');
    return NextResponse.json(updatedDish);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Yemek güncellenemedi." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE(request) {
  await connectMongo();
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop(); // URL'den ID'yi al
  try {
    await Dish.findByIdAndDelete(id);
    return NextResponse.rewrite(new URL('/api/dishes', request.url));
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Yemek silinemedi." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
