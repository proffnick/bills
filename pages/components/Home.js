import Navigation from "./layout/Navigation";
import FloatingLabelSelect from "./inputs/SelectService";
import React from "react";
import ServicesList from "./layout/ServicesList";
import { services } from '../lib/servicesData';
import FooterNav from "./layout/FooterNav";
import { useRouter } from "next/router";

const Home = () => {
  const [selected, setSelected] = React.useState('');
  const router = useRouter();

  const action = (value) => {
    setSelected(value);
    // send to services page
    if(value){
      if(typeof window !== "undefined"){
        document.getElementById("loader").style.display = "block";
      }
      router.push(`/service/${value}`);
    }
  }

  return(
    <>
    <Navigation />
    <main className="container-fluid pb-5">
      <div className="col-12 col-lg-6 mx-auto mb-5">
        <FloatingLabelSelect 
          label={`Select Service`}
          name={`services`}
          data={services}
          action={action}
        />
        <ServicesList />
      </div>
    </main>
    <FooterNav />
    </>
  )
}

export default Home;