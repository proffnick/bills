import TextInput from "../components/inputs/TextInput";
import SelectInput from "../components/inputs/SelectInput";
import Image from "next/image";
import React, { useContext } from "react";
import { AppContext } from "../context/context";


const BuyDataBundle = ({ image, data, process  }) => {
  const [amount, setAmount]     = React.useState('');
  const [phone, setPhone]       = React.useState('');
  const [selected, setSelected] = React.useState('');
  const amountRef               = React.useRef();

  const { 
      setStatus, 
      setModalContent,
      toggle} = useContext(AppContext);

  const act = () => {
    try {
      if(!amount || !phone || !selected ){
        setStatus('danger');
        setModalContent({
          message: "Please check your inputs",
          title: "error validation!"
        });
        toggle('on');
      }

      process({phone, amount, selected});

    } catch (error) {
      setStatus('danger');
      setModalContent({
        message: error.message,
        title: 'Error processing, try again'
      });
      toggle('on');
    }
  }

  const manageSelection = (selected) =>{
    try {
      setSelected(selected);
      // set the amount
      
      if(amountRef.current){
        amountRef.current.value = selected.amount;
        setAmount(selected.amount);
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return(
    <>
    <Image
      src={`${image}`}
      width={50}
      height={50} 
      alt={``}
      className={'rounded-3 shadow-sm d-block mx-auto mb-3'}
    />
    <SelectInput
      id={`data_bubdle`}
      data={data} 
      label={`Select ${data?.[0]?.name}`}
      name={`select_preferred_${data?.[0]?.item_code}`}
      action={manageSelection}
    />
    <TextInput 
      name={`amount`}
      label={`Enter purchase amount`}
      type={`number`}
      action={setAmount}
      reference={amountRef}
      disabled={true} 
    />
    <TextInput 
      name={`data_bundle`}
      label={`Enter phone number`}
      type={`number`}
      action={setPhone} 
    />
    <div className="d-grid gap-2">
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          act();
        }}
        className="btn btn-primary btn-lg" 
        type="button">Continue</button>
    </div>
    </>
  )
}

export default BuyDataBundle;