import React, { useState } from 'react';

const TextAreaInput = ({ 
  defaultValue='',
  name, 
  label, 
  action, 
  type ='text', 
  reference=null,
  disabled=false,
  height=200
 }) => {
  const [value, setValue] = useState('');

  const changeEvent = (value) => {
    setValue(value);
    action(value);
  }

  return (
    <div className="form-floating mb-3">
      <textarea
        defaultValue={defaultValue}
        style={{height: `${height}px`}}
        disabled={disabled}
        ref={reference} 
        name={name} 
        className="form-control border rounded-3 fw-bolder text-muted" 
        type={type}
        aria-label="text-area-input" 
        placeholder={label}
        onChange={(e) => changeEvent(e.target.value)}
        ></textarea>
    <label className='fw-bold text-muted' htmlFor={name}>{label}</label>
  </div>
  );
};

export default TextAreaInput;
