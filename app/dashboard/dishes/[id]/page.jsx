"use client"

import { getDishById } from '@/app/utils/actions';
import { useEffect, useState } from 'react';

const SingleDishPage = () => {
  const [dish, setDish] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dishId = window.location.pathname.split('/').pop();

    const fetchDish = async () => {
      try {
        const dishData = await getDishById(dishId);
        setDish(dishData); 
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDish();
  }, []);

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }

  if (!dish) {
    return <p>Yemek bulunamadı.</p>;
  }

  return (
    <div>
      <h1>Yemek Detayı</h1>
      <p>Adı: {dish.name}</p>
      <p>Malzemeler: {dish.ingredients}</p>
      {/* Daha fazla yemek detayı burada gösterilebilir */}
    </div>
  );
};

export default SingleDishPage;
