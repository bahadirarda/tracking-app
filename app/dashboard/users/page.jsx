"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '@/app/utils/actions'; // getUsers'i de import et

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); // getUsers fonksiyonunu kullan
        setUsers(data);
      } catch (error) {
        console.error('Kullanıcıları çekerken bir hata oluştu:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId);
      console.log('Kullanıcı başarıyla silindi:', result);
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Kullanıcı silinirken bir hata oluştu:', error);
    }
  };

  return (
    <div>
      <h1>Kullanıcılar</h1>
      <Link href="/dashboard/users/add">Yeni Kullanıcı Ekle</Link>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.email}
            <Link href={`/dashboard/users/${user._id}`}>Görüntüle</Link>
            <button onClick={() => handleDeleteUser(user._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
