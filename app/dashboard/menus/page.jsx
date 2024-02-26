"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMenus, deleteMenu } from '@/app/utils/actions'; 

const Menus = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getMenus(); 
        setMenus(data);
      } catch (error) {
        console.error('Menüleri çekerken bir hata oluştu:', error);
      }
    };

    fetchMenus();
  }, []);

  const handleDeleteMenu = async (menuId) => {
    try {
      const result = await deleteMenu(menuId);
      console.log('Menü başarıyla silindi:', result);
      const updatedMenus = menus.filter(menu => menu._id !== menuId);
      setMenus(updatedMenus);
    } catch (error) {
      console.error('Menü silinirken bir hata oluştu:', error);
    }
  };

  return (
    <div>
      <h1>Menüler</h1>
      <Link href="/dashboard/menus/add">Yeni Menü Ekle</Link>
      <ul>
        {menus.map((menu) => (
          <li key={menu._id}>
            {menu.name} {/* Örnek olarak menü adı gösterildi, gerektiği şekilde değiştirilebilir */}
            <Link href={`/dashboard/menus/${menu._id}`}>Görüntüle</Link>
            <button onClick={() => handleDeleteMenu(menu._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menus;
