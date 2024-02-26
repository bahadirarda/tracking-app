"use client"

import React, { useState, useEffect } from 'react';
import Calendar from '@/app/components/calendar/calendar';
import axios from 'axios';

const Schedules = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/menuServeDates');
        const fetchedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date),
          title: event.menuId.name
        }));
        console.log(fetchEvents);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Planlamalar çekilirken bir hata oluştu', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Menü Planlamaları</h1>
      <Calendar events={events} />
    </div>
  );
};

export default Schedules
