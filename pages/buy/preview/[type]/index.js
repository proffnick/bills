import React, {useContext} from "react";
import NotFound from "@/pages/components/layout/NotFound";
import Navigation from "@/pages/components/layout/Navigation";
import FooterNav from "@/pages/components/layout/FooterNav";
import store from "@/pages/lib/storage";
import { storeKeys } from "@/pages/lib/config";
import { AppContext } from "@/pages/context/context";
import { customApi, api } from "@/pages/api/api";
import { Wallet } from "@/pages/model/Wallet";

// purchaseHistory
// customer accounts

const ShowPreview = () => {
  
  const [data, setData] = React.useState(null);
  const { 
      showLoading, 
      closeLoading,
      user,
      wallet,
      setWallet,
      toggleModal
    } = useContext(AppContext);
  const [status, setStatus]   = React.useState('');
  const [success, setSuccess] = React.useState(null);
  // processing, pending, success, failed  

  const checkData = React.useCallback(() => {
    const savedData = store.get(storeKeys.current_transaction);
    console.log(savedData, 'saved data');
    if(
      savedData && 
      (JSON.stringify(savedData) !== JSON.stringify(data))
      ){
      setData({...savedData});
    }else if(!data){
      setData(false);
    }
  }, []);

  React.useEffect(() => {
    // details
    checkData();
    return;
  }, [checkData]);

  const makePurchase = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.setAttribute('disabled', true);
      showLoading();

      try {
        // get the data 
        const selected = data?.data; // amount, biller_code, item_code, 
        const account  = data?.account; // customer, biller_code
        // set status processing
        setStatus('processing');
        // make a request to the server to charge wallet
        const walletCharged = await customApi.post('/', {
          type: 'charge-wallet',
          amount: parseFloat(data.total),
          userId: user.id
        }); 

        console.log(walletCharged?.data, 'charged wallet data');

        if(!walletCharged.ok){
          closeLoading();
          setStatus('failed');
          toggleModal(
            'Wallet charge failed!',
            ((walletCharged?.data?.message) ? (walletCharged?.data?.message): `Please check your balance and try again`),
            'danger',
            'on'
          );

        }

        if(walletCharged.ok){
          setWallet({
            ...wallet,
            balance: walletCharged?.data?.newBalance
          });
        }

        // request purchase
        const bill = {
          country: selected.country,
          customer: account.customer,
          amount: parseFloat(data.amount),
          type: selected.biller_name,
          reference: data.reference,
        }
        console.log(bill, 'Bill data');
        const purchase = await customApi.post('/', {
          details: {...bill},
          type: 'pay-bill'
        });

        console.log(purchase?.data, 'Purchase data');

        if(!purchase.ok){
          setStatus('pending');
          // refund user
        }

        if(purchase?.ok && purchase?.data?.data?.status === 'successful'){
          console.log('One time purchase is successful');
          // successful
          setStatus('success');
        }

        // check status of transaction
        const tStatus = await customApi.get(`/`, {
          ref: data.reference,
          type: 'get-bill'
        });

        console.log(tStatus?.data, 'requery status');

        // set success data if successful
        // update wallet
        // do recipt printing
        closeLoading();
        e.target.removeAttribute('disabled');
      } catch (error) {
        closeLoading();
        e.target.removeAttribute('disabled'); 
      }
      
  }


  return (
    <>
    {
      (data === false) && 
      <div className="col-12 col-lg-5 mx-auto mb-5">
        <NotFound />
      </div>
    }
    <Navigation />
    {(data === null) && 
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    }
    {
    (Object.keys(data?data:{})?.length) && 
    <main className="container-fluid pb-5" style={{
      minHeight: '100vh'
    }}>
      <div className="col col-md-6 col-lg-5 col-xl-4 mx-auto">
        
        {
          status && <div className="w-100 mb-3 d-flex align-items-center justify-content-center flex-row">
            <div className="process rounded-circle text-center me-3 border border-secondary-subtle">
              {
                status === 'processing' ?
                <div style={{width: '1.2rem', height: '1.2rem'}} className="spinner-grow text-primary spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>:
                <i className="bi bi-check-all text-primary" style={{fontSize: '1.12rem'}}></i>
              }
            </div>
            <div className="process rounded-circle text-center me-3 border border-secondary-subtle">
              {
                (status === 'pending') ?
                <i className="bi bi-arrow-clockwise text-muted" style={{fontSize: '1.3rem'}}></i>: (status === 'success') ? 
                <i className="bi bi-check-all text-primary" style={{fontSize: '1.3rem'}}></i>:(status === 'failed') ? 
                <i className="bi bi-x text-danger" style={{fontSize: '1.3rem'}}></i>:
                <i className="bi bi-three-dots text-muted" style={{fontSize: '1.3rem'}}></i>
              }
            </div>
            <div className="process rounded-circle text-center me-3 border border-secondary-subtle">
              {
                (status === 'success') ?
                <i className="bi bi-check-all text-primary" style={{fontSize: '1.3rem'}}></i>: (status === 'failed') ? 
                <i className="bi bi-x text-danger" style={{fontSize: '1.3rem'}}></i>:
                <i className="bi bi-three-dots text-muted" style={{fontSize: '1.3rem'}}></i>
              }
            </div>
          </div>
        }
        
        <div className="card border border-secondary-subtle mt-5 rounded-3">
          <div className="card-header bg-light border-0">
            <h5 className="text-center text-muted fw-bolder">Purchase Preview</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">{
              Object.keys(data).map((d, i) => {
                if(d == 'data' || d == 'account' || d == 'status') return null;
                return <li key={i} className='list-group-item d-flex justify-content-between align-items-start'>
                  <div className="ms-2 me-auto">
                  <div className="fw-bold text-muted">{d}</div>
                  </div>
                  <span className='text-muted fw-light'>{JSON.stringify(data[d])?.replace(/"/g, '')}</span>
                </li>
              })
            }</ul>
          </div>
          <div className="card-footer border-0 bg-light">
            <div className="d-grid gap-2">
              <button onClick={makePurchase} className="btn btn-primary btn-lg border-0">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    }
    <FooterNav />
    </>
  )
}

export default ShowPreview;