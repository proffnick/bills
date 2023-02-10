import React from "react";
import NotFound from "@/pages/components/layout/NotFound";
import Navigation from "@/pages/components/layout/Navigation";
import FooterNav from "@/pages/components/layout/FooterNav";

const ShowPreview = () => {
  
  const [data, setData] = React.useState(null);

  React.useEffect(() => {

  }, [data]);

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
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    }
    {
    (data?.length) && <ul className="list-group list-group-flush">{
      Object.keys(data).map((d, i) => {
        return <li key={i} className='list-group-item d-flex justify-content-between align-items-start'>
          <div className="ms-2 me-auto">
           <div className="fw-bold text-muted">{d}</div>
          </div>
          <span className='text-muted fw-light'>{JSON.stringify(data[d])?.replace(/"/g, '')}</span>
        </li>
      })
    }</ul>
    }
    <FooterNav />
    </>
  )
}

export default ShowPreview;