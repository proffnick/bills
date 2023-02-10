import React from 'react';

const SelectTypeInput = ({id, name, label, data = [{name: 'default', value: ''}], action, defaultValue = '' }) => {

  const selectService = (value) => {
    if(value){
      action(value);
    }
  }

  return (
    <div className="form-floating mt-5 mb-3">
      <select 
        name={name} 
        className="form-select border rounded-3" 
        id={id} 
        aria-label="Floating label select example" 
        defaultValue={defaultValue}
        placeholder={label}
        onChange={(e) => selectService(e.target.value)}
        >
      <option value="">{label}</option>
      {data.map((option, index) => (
            <option 
              key={index+1} 
              value={option.value}
              >
              {option.name}
            </option>
          ))}
      </select>
    <label className='fw-bold' htmlFor={id}>{label}</label>
  </div>
  );
};

export default SelectTypeInput;
