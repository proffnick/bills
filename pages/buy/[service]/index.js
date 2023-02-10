import { useRouter } from "next/router";
import Navigation from "../../components/layout/Navigation";
import React, { useContext } from "react";
import { AppContext } from "@/pages/context/context";
import FooterNav from "../../components/layout/FooterNav";
import NotFound from "@/pages/components/layout/NotFound";
import BuyAirTime from "../Airtime";
import BuyDataBundle from "../DataBundle";
import BuyInternet from "../Internet";
import BuyPower from "../Power";
import BuyTvSub from "../Cables";
import PayChurch from "../Church";
import BuyOthers from "../Others";

import { storeKeys, charges, getUnique } from "@/pages/lib/config";
import { customApi } from "@/pages/api/api";
import store from "@/pages/lib/storage";

const BuyForm = () => {
  const router = useRouter();
  const path = (typeof document !== 'undefined')  ? window.location.href.split('/'): [];
  const { service } = router.query || {service: path[path.length - 1]};
  const [data, setData] = React.useState(null);
  const {
    showLoading, 
    closeLoading,
    toggleModal,
    info
  } = useContext(AppContext);

  React.useEffect(() => {
     // set all the data needed here 
     if(!data){
      const cd = store.get(storeKeys.current_data);
      if(cd) setData({...cd});
     }

  }, [data]);

  const checkCustomer = async (
    customer,
    biller_code,
    item_code
  ) => {
    console.log('I get called');
    try {
      const cust = await customApi.post(`/`, {
        customer,
        biller_code,
        item_code,
        type: 'validate'
      });

      return cust.data;

    } catch (error) {
      return {status: false, message: error.message };
    }
  }

  const proceed = async (data) => {
    // switch type
    // consider image
    // pick selected
    // start transaction if customer was successfully confirmed
    // before checking customer details, show loading
    console.log(data, 'returned after user selected what needs to be selected');
    // comes with selected


    switch(service){
      case 'airtime':{
        if(!(data?.phone)) return;
        showLoading();
        const customer = await checkCustomer(
          data?.phone,
          data?.selected?.biller_code,
          data?.selected?.item_code,
        );
        console.log(customer, ' customer info');
        const dt = {
          service: service,
          customer: customer?.data?.customer,
          biller_code: customer?.data?.biller_code,
          status: customer?.data?.response_message,
          amount: data.amount,
          network: data.selected.name
        }
        
        const runConfirm = () => {
          // check if this type is to be charged 
          // take selected, customer 
          if(!customer.status) return;
          const total = 
          (data?.selected?.amount) ? 
          (parseFloat(data?.selected?.amount) + parseFloat(charges[service])): 
          (parseFloat(data.amount) + parseFloat(charges[service]));

          const amt = parseFloat(data?.selected?.amount) > 0 ? parseFloat(data?.selected?.amount): data.amount; 

          const service_charge = parseFloat(charges[service]);
          dt.amount = amt;
          dt.total = total;
          dt.service_charge = service_charge;
          dt.data = data?.selected; 
          dt.account = customer?.data;
          dt.reference = getUnique();

          // store current transaction
          console.log(dt, 'transactions object');

          const saved = store.save(storeKeys.current_transaction, dt);

          if(saved){
            router.push(`/buy/preview/${service}`);
          }

        }

        info.addInfo('Customer Detail', dt, runConfirm);

        closeLoading();

        if(!customer.status){
          toggleModal(
            "No details",
            customer.message,
            "danger",
            "on"
          );
        }
        
        info.open();

      };
      break;
      case 'data_bundle':{
        if(!(data?.phone)) return;
        showLoading();
        const customer = await checkCustomer(
          data?.phone,
          data?.selected?.biller_code,
          data?.selected?.item_code,
        );
        closeLoading();

        console.log(customer, 'Validated data bundle');
        const dt = {
          customer: customer?.data?.customer,
          biller_code: customer?.data?.biller_code,
          status: customer?.data?.response_message,
          amount: data.amount,
          network: data.selected.name
        }

        info.addInfo('Customer Detail', dt);

        if(!customer.status){
          toggleModal(
            "No details",
            customer.message,
            "danger",
            "on"
          );
        }

        info.open();

      };
      break;
      case 'internet':{
        if(!(data?.account)) return;
        showLoading();
        const customer = await checkCustomer(
          data?.account,
          data?.selected?.biller_code,
          data?.selected?.item_code,
        );
        console.log(customer);
        closeLoading();

        if(!customer.status){
          toggleModal(
            "No details",
            customer.message,
            "danger",
            "on"
          );
        } 
      };
      break;
      case 'power':{
        if(!(data?.meter)) return;
        showLoading();
        const customer = await checkCustomer(
          data?.meter,
          data?.selected?.biller_code,
          data?.selected?.item_code,
        );
        console.log(customer);
        closeLoading();
        const dt = {
          meter_account: customer?.data?.customer,
          customer_name: customer?.data?.name,
          biller_code: customer?.data?.biller_code,
          status: customer?.data?.response_message,
          amount: data.amount,
          network: data.selected.name,
          minimum_payable: customer?.data?.minimum, 
          maximum_payable: customer?.data?.maximum,
        }
        
        info.addInfo('Customer Account Detail', dt);

        if(!customer.status){
          toggleModal(
            "No details",
            customer.message,
            "danger",
            "on"
          );
        } 
        info.open();

      };
      break;
      case 'cable':{
        if(!(data?.cardNumber)) return;
        showLoading();
        const customer = await checkCustomer(
          data?.cardNumber,
          data?.selected?.biller_code,
          data?.selected?.item_code,
        );
        console.log(customer, 'TV Customer');

        const dt = {
          customer_name: customer?.data?.name,
          smart_card: customer?.data?.customer,
          biller_code: customer?.data?.biller_code,
          status: customer?.data?.response_message,
          amount: data.amount,
          package: data.selected.name
        }
        info.addInfo('Customer Detail', dt);
        closeLoading();

        if(!customer.status){
          toggleModal(
            "No details",
            customer.message,
            "danger",
            "on"
          );
        }

        info.open();
        

      };
      break;
      case 'church':{
        if(!(data?.phone)) return;
      };
      break;
      case 'others':{
        if(!(data?.phone)) return;
      };
      break;
      default:
        
    }
  }

  const printServiceList = React.useMemo(() => {
    //console.log('How many times did you print?');
     if(!data) return <h3 className="text-center text-muted py-5 my-5"> Loading...</h3>;

      switch(service){
        case 'airtime':{
          return (
            <BuyAirTime
            image={data?.image} 
            data={data}
            process={proceed} 
            />
          )
        };
        case 'data_bundle':{
          return (
            <BuyDataBundle
            image={data?.image} 
            data={data?.data}
            process={proceed} 
            />
          )
        };
        case 'internet':{
          return (
            <BuyInternet
            image={data?.image} 
            data={data?.data}
            process={proceed} 
            />
          )
        };
        case 'power':{
          return (
            <BuyPower
            image={data?.image} 
            data={data?.data}
            process={proceed} 
            />
          )
        };
        case 'cable':{
          return (
            <BuyTvSub
            image={data?.image} 
            data={data?.data}
            process={proceed} 
            />
          )
        };
        case 'church':{
          return (
            <PayChurch
            image={data?.image} 
            data={data?.data}
            process={proceed} 
            />
          )
        };
        case 'others':{
          return (
            <BuyOthers
            image={data?.image} 
            data={data?.data}
            process={proceed} 
            />
          )
        };

        default:
          return(
            <h3 className="text-center text-muted py-5 my-5"> Service Not Available</h3>
          )
      }
  }, [data]);
  

  return(
    <>
    {!service?
      <div className="col-12 col-lg-5 mx-auto mb-5">
        <NotFound />
      </div>
      :
      <>
      <Navigation />
        <main className="container-fluid pb-5">
          <div className="col-12 col-lg-4 mx-auto pb-5 mb-5">
            {
            data? 
            <>{printServiceList}</>: <h3 className="text-center text-muted py-5 my-5"> Loading... </h3>
            }
          </div>
        </main>
      <FooterNav />
      </>
    }
    </>
  )
}

export default BuyForm;
