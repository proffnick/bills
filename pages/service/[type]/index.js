import { useRouter } from "next/router";
import Navigation from "../../components/layout/Navigation";
import React from "react";
import ServicesTypes from "../../components/layout/ServicesTypes";
import FooterNav from "../../components/layout/FooterNav";
import NotFound from "@/pages/components/layout/NotFound";
import { api } from "@/pages/api/api";
import { churches, tv, others } from "@/pages/lib/config";
import store from "@/pages/lib/storage";
import { storeKeys } from "@/pages/lib/config";

const ServiceListing = ({ list }) => {
  const router = useRouter();
  const { type } = router.query;
  const [data, setData] = React.useState([]);

  const filterResults = React.useCallback(() => {
    if(list?.length){
      const byCountryData = list.filter(item => item.country == 'NG');
      
      if(byCountryData.length){
        // loop over the by Country data
        const Grouped = [];
        const unique  = [];
        byCountryData.forEach(item => {
          if(!unique.includes(item.biller_code)){
            if(type === 'cable'){
              unique.push(item.biller_code);
            } else if (type === 'church' && churches.includes(item.name)) {
              unique.push(item.biller_code);
            }else if (type === 'others' && others.includes(item.name)) {
              unique.push(item.biller_code);
            }else if(type === 'data_bundle'){
              unique.push(item.biller_code);
            }else if(type === 'internet'){
              unique.push(item.biller_code);
            }else if(type === 'airtime'){
              unique.push(item.biller_code);
            }else if(type === 'power'){
              unique.push(item.biller_code);
            }
          }
        });
        unique.forEach(code => {
          let group = byCountryData.filter(service => service.biller_code === code);
          if(group.length){
            Grouped.push(group);
          }
        });
        console.log(Grouped, 'the grouped');
        setData([...Grouped]);
      }
    }
  }, [list]);

  React.useEffect(() => {
    filterResults();
  }, [data.length, filterResults]);

  const proceed = (code, type, image) => {
    console.log(code, type, image);
    // check the selected service
    const selected = data.filter(group => group?.[0]?.biller_code === code);

    if(selected.length){
      // save the selected 
      console.log(selected[0], 'selected');
      const d = {
        data: selected[0],
        image: image
      }
      const data = store.save(storeKeys.current_data, d);
      if(data){
        router.push(`/buy/${type}`);
      }
    }

  }
  

  return(
    <>
    {!type?
      <div className="col-12 col-lg-5 mx-auto mb-5">
        <NotFound />
      </div>
      :
      <>
      <Navigation />
        <main className="container-fluid pb-5">
          <div className="col-12 col-lg-5 mx-auto pb-5 mb-5">
            {
            data.length ? 
            <ServicesTypes 
            services={data}
            type={type} 
            action={proceed}
            />: <h3 className="text-center text-muted py-5 my-5"> Service Not Available </h3>
            }
          </div>
        </main>
      <FooterNav />
      </>
    }
    </>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const res = await api.get(`/bill-categories?${context.params.type}=1`);
    return {
      props: {
        list: (res?.data?.data) ? res?.data?.data: null
      }
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        list: null
      }
    }
  }
}

export default ServiceListing;
