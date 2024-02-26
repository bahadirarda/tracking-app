"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function AddUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Kullanıcı oluşturulamadı!');
      }

      // Başarılı POST işlemi sonrası yönlendirme
      router.push('/dashboard/users');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">E-posta</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Şifre</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Ekleniyor...' : 'Kullanıcı Ekle'}
      </button>
    </form>
  );
}

export default AddUserPage;
