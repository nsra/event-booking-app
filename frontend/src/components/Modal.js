import React from 'react' 

export default function Modal({
  title,
  body,
  onConfirm,
  onCancel,
  confirmText,
  isDisabled
}) {
  return (
    <div className='custom-modal'>
      <header className='custom-modal-header'>{title}</header>
      <section className='custom-modal-content'>{body}</section>
      <section className='custom-modal-actions'>
        <button className='btn' onClick={onConfirm} disabled={isDisabled}>
          {confirmText}
        </button>
        <button className='btn cancel' onClick={onCancel}>
          إغلاق
        </button>
      </section>
    </div>
    
  ) 
}
