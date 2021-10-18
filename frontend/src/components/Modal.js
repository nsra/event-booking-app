import React from 'react' 

export default function Modal({
  title,
  children,
  onConfirm,
  onCancel,
  confirmText,
  isDisabled
}) {
  return (
    <div className='modal'>
      <header className='modal-header'>{title}</header>
      <section className='modal-content'>{children}</section>
      <section className='modal-actions'>
        <button className='btn submit-btn' onClick={onConfirm} disabled={isDisabled}>
          {confirmText}
        </button>
        <button className='btn' onClick={onCancel}>
          إغلاق
        </button>
      </section>
    </div>
  ) 
}
