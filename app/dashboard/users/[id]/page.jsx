"use client"

import { getUserById } from '@/app/utils/actions';
import { useEffect, useState } from 'react';

const SingleUserPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = window.location.pathname.split('/').pop();

    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData); 
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }

  if (!user) {
    return <p>Kullanıcı bulunamadı.</p>;
  }

  return (
    <div>
      <h1>Kullanıcı Detayı</h1>
      <p>E-posta: {user.email}</p>
    </div>
  );
};

export default SingleUserPage;
