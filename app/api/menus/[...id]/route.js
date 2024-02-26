import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Menu } from "../../../utils/models"; // Menu modelinizin yolu projenize göre değiştirilmelidir.

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
    const menu = await Menu.findById(id);
    if (!menu) {
      return new Response(JSON.stringify({ error: "Menü bulunamadı." }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return NextResponse.json(menu);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Menü getirilirken bir hata oluştu." }), {
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
  const id = pathname.split("/")[pathname.split("/").length - 1]; // URL'den ID'yi al

  try {
    const data = await request.json();
    console.log(`Güncellenmek üzere ID: ${id}, Gönderilen veri:`, data);
    const updatedMenu = await Menu.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();

    if (!updatedMenu) {
      console.log("Güncellenen menü:", updatedMenu);
      return new Response(
        JSON.stringify({ error: "Menü bulunamadı veya güncellenemedi." }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return NextResponse.json(updatedMenu);
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(
      JSON.stringify({ error: "Menü güncellenirken bir hata oluştu." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(request) {
  await connectMongo();
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop(); // URL'den ID'yi al
  try {
    const deleteResult = await Menu.findByIdAndDelete(id);
    if (!deleteResult) {
      return new Response(JSON.stringify({ error: "Menü bulunamadı veya zaten silinmiş." }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify({ message: "Menü başarıyla silindi." }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Hata: ", error);
    return new Response(JSON.stringify({ error: "Menü silinemedi." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

