import Navigation from "./layout/Navigation";
import FooterNav from "./layout/FooterNav";
import { format } from "fecha";

const Blog = ({ doc }) => {

  return(
    <>
    {!doc && 
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    </div>
    }
    
    {doc &&<><Navigation /><main className="container-fluid pb-5" style={{
        minHeight: '100vh'
      }}>
        <div className="row p-0 m-0">
          <div className="col-12 col-md-2 col-lg-3 col-xl-5"></div>
          <div className="col-12 col-md-10 col-lg-9 col-xl-7 bg-white">
            <div style={{minHeight: '100vh'}} className="p-2 p-lg-5 w-100 border-start">
            <h2 className="mb-2 text-muted h5">{format((new Date(doc?.created_date)), 'MM-DD-YYYY hh:mm:ss A')}</h2>
            <h3 className="mb-3 text-primary">{doc.title}</h3>
            <hr className="border border-secondary-subtle" />
            <div dangerouslySetInnerHTML={{__html: doc.content}}></div>
            </div>
          </div>
        </div>

    </main></>}
    <FooterNav />
    </>
  );
}

export default Blog;