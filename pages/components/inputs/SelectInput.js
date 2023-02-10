import React from 'react';

const SelectInput = ({id, name, label, data, action }) => {

  const selectService = (value) => {

    const val = data[parseInt(value) - 1];
    console.log(val, value);
    if(val){
      action(val);
    }
  }

  return (
    <div className="form-floating mt-5 mb-3">
      <select 
        name={name} 
        className="form-select border rounded-3" 
        id={id} 
        aria-label="Floating label select example" 
        defaultValue={``}
        placeholder={`Make a choice`}
        onChange={(e) => selectService(e.target.value)}
        >
      <option value="">{label}</option>
      {data.map((option, index) => (
            <option 
              key={index+1} 
              value={index+1}
              >
              {option.biller_name}
            </option>
          ))}
      </select>
    <label className='fw-bold' htmlFor={id}>{label}</label>
  </div>
  );
};

export default SelectInput;
