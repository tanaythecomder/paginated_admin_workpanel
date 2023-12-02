// Modal.js
import React from 'react';

const Modal = ({ handleClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0  opacity-50"></div>
      <div className="z-50 bg-white p-6 rounded shadow-lg max-w-md">
        <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={handleClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
