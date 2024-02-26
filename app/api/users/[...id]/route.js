import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { User } from '@/app/utils/models/'; // Kullanıcı modelinizin yolu projenize göre değiştirilmelidir.

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
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ error: "Kullanıcı bulunamadı." }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Kullanıcı getirilirken bir hata oluştu." }), {
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
  const id = pathname.split('/').pop(); // URL'den ID'yi al
  try {
    const data = await request.json();
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Kullanıcı güncellenemedi." }), {
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
    const deleteResult = await User.findByIdAndDelete(id);
    if (!deleteResult) {
      return new Response(JSON.stringify({ error: "Kullanıcı bulunamadı veya zaten silinmiş." }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify({ message: "Kullanıcı başarıyla silindi." }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Kullanıcı silinemedi." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

