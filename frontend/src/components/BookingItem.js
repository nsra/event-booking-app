import React from 'react';

export default function BookingItem({ _id, event, createdAt, onCancelBooking }) {
  return (
    <li className='bookings__item'>
      <div className='bookings__item-data'>
        {event.title} - {new Date(createdAt).toLocaleDateString()} - {event.price}$
      </div>
      <div className='bookings__item-actions'>
        <button className='btn' onClick={() => onCancelBooking(_id)}>
          إلغاء
        </button>
      </div>
    </li>
  );
}
