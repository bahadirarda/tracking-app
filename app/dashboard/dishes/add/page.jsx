"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMenus } from '@/app/utils/actions'; // getMenus'u import et

function AddDishPage() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [menuId, setMenuId] = useState('');
  const [menus, setMenus] = useState([]); // Mevcut menüler için state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Menü listesini çekmek için useEffect
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const fetchedMenus = await getMenus();
        setMenus(fetchedMenus);
      } catch (error) {
        setError('Menüler yüklenirken bir hata oluştu.');
      }
    };

    fetchMenus();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const dishData = { name, ingredients, menuId };
      const response = await fetch('/api/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dishData),
      });

      if (!response.ok) {
        throw new Error('Yemek oluşturulamadı!');
      }

      // Başarılı POST işlemi sonrası yönlendirme
      router.push('/dashboard/dishes');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Yemek Adı</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="ingredients">Malzemeler</label>
      <input
        id="ingredients"
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />

      <label htmlFor="menuId">Menü</label>
      <select
        id="menuId"
        value={menuId}
        onChange={(e) => setMenuId(e.target.value)}
        required
      >
        <option value="">Menü Seçin</option>
        {menus.map((menu) => (
          <option key={menu._id} value={menu._id}>
            {menu.name}
          </option>
        ))}
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Ekleniyor...' : 'Yemek Ekle'}
      </button>
    </form>
  );
}

export default AddDishPage;
