import React from 'react';
import './partialsStyling/confirmWindow.css';

const ConfirmWindow = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-window-backdrop">
      <div className="confirm-window-content">
        <p className="confirm-window-message">{message}</p>
        <button onClick={onConfirm} className="confirm-window-button confirm">Ja</button>
        <button onClick={onClose} className="confirm-window-button cancel">Nej</button>
      </div>
    </div>
  );
};

export default ConfirmWindow;
