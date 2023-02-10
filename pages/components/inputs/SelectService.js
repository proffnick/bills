import React, { useState } from 'react';

const FloatingLabelSelect = ({ name, label, data, action }) => {
  const [value, setValue] = useState('');

  const selectService = (value) => {
    setValue(value);
    action(value);
  }

  return (
    <div className="form-floating mt-5 mb-3">
      <select 
        name={name} 
        className="form-select rounded-3" 
        id="floatingSelect" 
        aria-label="Floating label select example" 
        defaultValue={value}
        onChange={(e) => selectService(e.target.value)}
        >
      <option value="">{label}</option>
      {data.map(option => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
    <label className='fw-bold' htmlFor="floatingSelect">{label}</label>
  </div>
  );
};

export default FloatingLabelSelect;
