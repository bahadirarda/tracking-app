import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Customer } from '@/app/utils/models'; // Yolunuzun projenizin yapısına uygun olduğundan emin olun.

// MongoDB'ye bağlan
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
    const customer = await Customer.findById(id);
    if (!customer) {
      return new Response(JSON.stringify({ error: "Müşteri bulunamadı." }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return NextResponse.json(customer);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Müşteri getirilirken bir hata oluştu." }), {
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
    const updatedCustomer = await Customer.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Müşteri güncellenemedi." }), {
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
  const id = pathname.split('/').pop();
  try {
    await Customer.findByIdAndDelete(id);
    return NextResponse.rewrite(new URL('/api/customers', request.url)); // Silme işlemi sonrası müşteri listesine yönlendir
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Müşteri silinemedi." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
