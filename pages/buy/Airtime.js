import TextInput from "../components/inputs/TextInput";
import Image from "next/image";
import React, { useContext } from "react";
import { AppContext } from "../context/context";


const BuyAirTime = ({ image, data, process  }) => {
  const [amount, setAmount] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const { 
      setStatus, 
      setModalContent,
      toggle} = useContext(AppContext);

  const act = () => {
    try {
      if(!amount || !phone){
        setStatus('danger');
        setModalContent({
          message: "Please check your inputs",
          title: "error validation!"
        });
        toggle('on');
      }

      process({
        phone, 
        amount, 
        selected: 
        data?.data?.[0],
        image: data?.image
      });

    } catch (error) {
      setStatus('danger');
      setModalContent({
        message: error.message,
        title: 'Error processing, try again'
      });
      toggle('on');
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
    <TextInput 
      name={`amount`}
      label={`Enter purchase amount`}
      type={`number`}
      action={setAmount} 
    />
    <TextInput 
      name={`airtime`}
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

export default BuyAirTime;