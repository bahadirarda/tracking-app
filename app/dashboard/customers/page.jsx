"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '@/app/utils/actions'; // getCustomers ve deleteCustomer'ı import et

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers(); // getCustomers fonksiyonunu kullan
        setCustomers(data);
      } catch (error) {
        console.error('Müşterileri çekerken bir hata oluştu:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (customerId) => {
    try {
      const result = await deleteCustomer(customerId);
      console.log('Müşteri başarıyla silindi:', result);
      const updatedCustomers = customers.filter(customer => customer._id !== customerId);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Müşteri silinirken bir hata oluştu:', error);
    }
  };

  return (
    <div>
      <h1>Müşteriler</h1>
      <Link href="/dashboard/customers/add">Yeni Müşteri Ekle</Link>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.email}
            <Link href={`/dashboard/customers/${customer._id}`}>Görüntüle</Link>
            <button onClick={() => handleDeleteCustomer(customer._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
