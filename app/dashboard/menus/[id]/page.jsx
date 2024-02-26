"use client"

import { getMenuById } from '@/app/utils/actions';
import { useEffect, useState } from 'react';

const SingleMenuPage = () => {
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const menuId = window.location.pathname.split('/').pop();

    const fetchMenu = async () => {
      try {
        const menuData = await getMenuById(menuId);
        setMenu(menuData); 
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }

  if (!menu) {
    return <p>Menü bulunamadı.</p>;
  }

  return (
    <div>
      <h1>Menü Detayı</h1>
      <p>Adı: {menu.name}</p>
      <p>Açıklama: {menu.description}</p>
      {/* Daha fazla menü detayı burada gösterilebilir */}
    </div>
  );
};

export default SingleMenuPage;
