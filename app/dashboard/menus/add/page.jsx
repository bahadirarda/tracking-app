"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDishes } from '@/app/utils/actions'; 

function AddMenuPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dishes, setDishes] = useState([]); 
  const [selectedDishes, setSelectedDishes] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const fetchedDishes = await getDishes();
        setDishes(fetchedDishes);
      } catch (error) {
        setError('Yemekler yüklenirken bir hata oluştu.');
      }
    };

    fetchDishes();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const menuData = { name, description, dishes: selectedDishes };
      const response = await fetch('/api/menus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      });

      if (!response.ok) {
        throw new Error('Menü oluşturulamadı!');
      }

      
      router.push('/dashboard/menus');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Menü Adı</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="description">Açıklama</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="dishes">Yemekler</label>
      <select
        id="dishes"
        multiple
        value={selectedDishes}
        onChange={(e) => setSelectedDishes([...e.target.selectedOptions].map(option => option.value))}
        required
      >
        {dishes.map((dish) => (
          <option key={dish._id} value={dish._id}>
            {dish.name}
          </option>
        ))}
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Ekleniyor...' : 'Menü Ekle'}
      </button>
    </form>
  );
}

export default AddMenuPage;
