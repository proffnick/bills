import React, { useContext } from 'react';
import { AppContext } from '../context/context';
import { Wallet } from '../model/Wallet';
import { WH } from '../model/WalletHistory';
import Navigation from './layout/Navigation';
import FooterNav from './layout/FooterNav';
import { useRouter } from 'next/router';
import store from '../lib/storage';
import { storeKeys, getUnique, charges } from '../lib/config';
import TextInput from './inputs/TextInput';
import InitPayment from './InitPayment';
import { format } from 'fecha';


const WalletModule = () => {
  const [recents, setRecents] = React.useState(null);
  const { 
    showLoading, 
    closeLoading,
    wallet,
    user,
    setWallet,
    toggleModal 
  }  = useContext(AppContext);
  const router = useRouter();
  const [amount, setAmount] = React.useState();
  const [startAmount, setStartAmount] = React.useState(0);


  const fetchRecents = async () => {
    try {
      const recents = await WH.getAll(null, `created_date,desc`, `user_id,==,${user?.id}`, 25);
  
      if(!recents) return;
  
      setRecents(recents);
  
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if(!wallet){
      // save current page
      store.save(storeKeys.current_path, '/wallet');
      router.push('/login');
    }
    if(!recents){fetchRecents()}
    
    return;
  }, [wallet, startAmount]);


  const printRecents = React.useMemo(() => {
      try {
        console.log(recents?.documents);
        if(recents?.documents){
          if((recents?.documents?.length)){
            return( 
            <>
            <h6 className='text-muted mb-3 fw-bolder'>Recent Payments</h6>
            <table className='table table-responsive table-hover table-borderless table-striped'>
              <thead>
                <tr className='text-muted'>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
              {recents.documents.map((doc, index) => <tr key={index}>
                <td className='fw-bold text-muted'>{doc.amount}</td>
                <td className='fw-light'>{doc.status}</td>
                <td className='fw-light'>{doc.transaction_id}</td>
                <td className='fw-light'>{format((new Date((doc?.created_date?.seconds) * 1000)), 'MM-DD-YYYY [at] HH:mm:ss a')}</td>
              </tr>)}
              </tbody>
            </table>
            </>
            )
          }
        }

      } catch (error) {
        console.log(error);
        return null;
      }
  }, [recents])

  const handleCallback = async (response) => {
    setStartAmount(0);
    try {
      const { 
        status,
        amount,
        transaction_id,
        flw_ref,
        charge_response_code 
      } = response;

      if(status === 'successful' && charge_response_code === '00'){
        showLoading();
        const history = await WH.find('transaction_id', transaction_id);
        console.log(history, 'history');
        const getWallet = await Wallet.read(wallet.id);
        console.log(getWallet, 'history');
        if(!history && getWallet){
          const newData = {
            ...getWallet,
            balance: parseFloat(getWallet.balance) + amount
          };
          await Wallet.update(getWallet.id, {
           ...newData 
          });
          await WH.create({
            id: getUnique(),
            transaction_id,
            flw_ref,
            amount,
            status,
            user_id: user.id,
            email: user.email,
            created_date: new Date()
          });
          setWallet({...newData});
          fetchRecents();
          closeLoading();
        }
      }else if(amount){
        showLoading();
        const history = await WH.find('transaction_id', transaction_id);
        if(!history){
          await WH.create({
            id: getUnique(),
            transaction_id,
            flw_ref,
            amount,
            status,
            user_id: user.id,
            email: user.email,
            created_date: new Date()
          });
          closeLoading();
        }
        closeLoading();
      }

    } catch (error) {
      closeLoading();
      console.log(response, 'payment response in case');
    }
    
  }

  const initiateFunding = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if(!parseFloat(amount) || parseFloat(amount) < 100){
        toggleModal(
          'Invalid amount',
          'Please enter sizable amount',
          'danger',
          'on'
        );
        return;
      }
      if(parseFloat(amount) < charges?.business_min){
        toggleModal(
          'Business Account Funding',
          `Minimum Deposit for business(merchant) account is: N${charges.business_min}`,
          'danger',
          'on'
        );
        return;
      }
      setStartAmount(parseFloat(amount));

    } catch (error) {
      console.log(error.message);
    }
    
  }


  return (
    <>
    <Navigation />
    <main className="container-fluid pb-5" style={{
      minHeight: '100vh'
    }}>
      <div className='row m-0 p-0'>
        <div className="col-12 col-md-5 col-lg-5 col-xl-6">
          <div className='d-flex align-items-center justify-content-center flex-column mt-5'>
            <div className='text-center mb-2'>
              {wallet && <button className='btn btn-light rounded-pill fw-bolder text-muted btn-lg'>Balance: 
                <span className='badge text-bg-secondary rounded-pill'>N{parseFloat(wallet.balance).toFixed(2)}</span>
              </button>}
            </div>
            <div className='text-center mb-2'>
              {user &&<span className='badge p-2 bg-white rounded-pill text-muted'>Account({(user?.account_type)?user?.account_type: 'personal'})</span>}
            </div>
            <div className='text-center mb-3'>
              <div className='mb-3'>
                <TextInput 
                  name={'amount'}
                  label={'Enter Amount'}
                  action={setAmount}
                  type={'number'}
                />
              </div>
              <div className="d-grid gap-2">
                <button onClick={initiateFunding} className='btn btn-primary border-0 rounded-3 btn-lg px-3'>
                Fund Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
        <div 
        style={{minHeight: '100vh'}} 
        className="col-12 mt-4 mt-md-0 col-md-7 col-lg-7 col-xl-6 px-5 border-start">
          {printRecents}
        </div>
      </div>

    </main>
    {startAmount && <InitPayment
    callback={handleCallback} 
    amount={startAmount}
    reset={setStartAmount} 
    />}
    <FooterNav />
    </>
  )

}
export default WalletModule;