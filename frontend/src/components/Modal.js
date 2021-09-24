import React from 'react';

export default function Modal({
  title,
  children,
  onConfirm,
  onCancel,
  confirmText,
}) {
  return (
    <div className='modal'>
      <header className='modal__header'>{title}</header>
      <section className='modal__content'>{children}</section>
      <section className='modal__actions'>
        <button className='btn' onClick={onConfirm}>
          {confirmText}
        </button>
        <button className='btn' onClick={onCancel}>
          إلغاء
        </button>
      </section>
    </div>
  );
}
