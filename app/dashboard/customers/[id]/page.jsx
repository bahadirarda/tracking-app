"use client"

import { getCustomerById } from '@/app/utils/actions'; // getCustomerById fonksiyonunu import et
import { useEffect, useState } from 'react';

const SingleCustomerPage = () => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customerId = window.location.pathname.split('/').pop();

    const fetchCustomer = async () => {
      try {
        const customerData = await getCustomerById(customerId);
        setCustomer(customerData); 
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }

  if (!customer) {
    return <p>Müşteri bulunamadı.</p>;
  }

  return (
    <div>
      <h1>Müşteri Detayı</h1>
      <p>Adı: {customer.firstName}</p>
      <p>Soyadı: {customer.lastName}</p>
      <p>E-posta: {customer.email}</p>
      <p>Telefon: {customer.phone}</p>
      <p>Bağlı olduğu kullanıcı: {customer.userId}</p>
      {/* Diğer müşteri bilgilerini burada gösterebilirsiniz */}
    </div>
  );
};

export default SingleCustomerPage;
