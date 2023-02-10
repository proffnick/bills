import Navigation from "./layout/Navigation";
import React, {useContext} from "react";
import FooterNav from "./layout/FooterNav";
import { useRouter } from "next/router";
import { AppContext } from "../context/context";
import AdminNav from "./layout/AminNav";
import IconCard from "./layout/IconCards";
import NotFound from "./layout/NotFound";
import PagesList from "../admin/Pages";

const Admin = ({ active }) => {
  const router    = useRouter();
  const { user }  = useContext(AppContext);

  React.useEffect(() => {
    if(user && !(user?.account_type === 'admin')){
      router.push('/');
    }
  }, [user]);

  const printPage = (active) => {
    switch(active){
      case 'pages': return <PagesList />
      default: return <NotFound />
    }
  }

  return(
    <>
    <Navigation />
    <main className="container-fluid pb-5 pt-5">
      <div className="row p-0 m-0">
        <div style={{minHeight: '100vh'}} className="col-2 col-lg-2 mx-auto mb-5 h-100">
          <AdminNav active={active? active: 'stats'} />
        </div>
        <div style={{minHeight: '100vh'}} className="col-10 col-lg-10 mx-auto mb-5 h-100">
          <div style={{minHeight: '100vh'}} className="bg-white rounded-3 px-3 py-4 border">
          {(active === 'stats' || !active) ? <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
            <IconCard 
              title={'Users'}
              icon={'people'} 
              value={3}
              iconColorClass={'text-primary'}
            />
            <IconCard 
              title={'Wallets Bal'}
              icon={'cash-stack'} 
              value={5000}
              iconColorClass={'text-primary'}
            />
            <IconCard 
              title={'Total trans'}
              icon={'currency-exchange'} 
              value={500}
              iconColorClass={'text-primary'}
            />
            <IconCard 
              title={'Trans Vol'}
              icon={'bar-chart-fill'} 
              value={500}
              iconColorClass={'text-primary'}
            />
          </div>: printPage(active)}
          </div>
        </div>
      </div>
    </main>
    <FooterNav />
    </>
  )
}

export default Admin;