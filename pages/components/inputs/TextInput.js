import React, { useState } from 'react';

const TextInput = ({ 
  defaultValue='',
  name, 
  label, 
  action, 
  type ='text', 
  reference=null,
  disabled=false
 }) => {
  const [value, setValue] = useState('');

  const changeEvent = (value) => {
    setValue(value);
    action(value);
  }

  return (
    <div className="form-floating mb-3">
      <input
        defaultValue={defaultValue}
        disabled={disabled}
        ref={reference} 
        name={name} 
        className="form-control border rounded-3 fw-bolder text-muted" 
        type={type}
        aria-label="input" 
        placeholder={label}
        onChange={(e) => changeEvent(e.target.value)}
        />
    <label className='fw-bold text-muted' htmlFor={name}>{label}</label>
  </div>
  );
};

export default TextInput;
