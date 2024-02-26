"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getDishes, deleteDish } from '@/app/utils/actions'; // getDishes ve deleteDish'ı import et

const Dishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const data = await getDishes(); // getDishes fonksiyonunu kullan
        setDishes(data);
      } catch (error) {
        console.error('Yemekleri çekerken bir hata oluştu:', error);
      }
    };

    fetchDishes();
  }, []);

  const handleDeleteDish = async (dishId) => {
    try {
      const result = await deleteDish(dishId);
      console.log('Yemek başarıyla silindi:', result);
      const updatedDishes = dishes.filter(dish => dish._id !== dishId);
      setDishes(updatedDishes);
    } catch (error) {
      console.error('Yemek silinirken bir hata oluştu:', error);
    }
  };

  return (
    <div>
      <h1>Yemekler</h1>
      <Link href="/dashboard/dishes/add">Yeni Yemek Ekle</Link>
      <ul>
        {dishes.map((dish) => (
          <li key={dish._id}>
            {dish.name} {/* Yemek adı gösterildi, gerektiği şekilde değiştirilebilir */}
            <Link href={`/dashboard/dishes/${dish._id}`}>Görüntüle</Link>
            <button onClick={() => handleDeleteDish(dish._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dishes;
