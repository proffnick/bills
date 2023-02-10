import Navigation from "./layout/Navigation";
import FooterNav from "./layout/FooterNav";
import Link from "next/link";
import { format } from "fecha";

const Blogs = ({ docs }) => {

  const navigate = () => {
    document.getElementById('loader').style.display = 'block';
    return true;
  }

  return(
    <>
    {!docs && 
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    </div>
    }
    
    {docs &&<><Navigation /><main className="container-fluid pb-5" style={{
        minHeight: '100vh'
      }}>
        <div className="row p-0 m-0">
          <div className="col-12 col-md-2 col-lg-3 col-xl-5"></div>
          <div className="col-12 col-md-10 col-lg-9 col-xl-7">
            <div style={{minHeight: '100vh'}} className="p-2 p-lg-5 w-100 border-start">
              {docs.map((doc, index) => <div key={index} className="card mb-3">
                <div className="card-body">
                  <h3 className="mb-3 text-muted">{doc.title}  <br /><small className="text-primary fs-6 fw-lighter">- {format((new Date(doc.created_date)), 'DD-MM-YYYY hh:mm A')}</small>  </h3>
                  <div dangerouslySetInnerHTML={{__html: doc.desc}}></div>
                </div>
                <div className="card-footer border-0 bg-white">
                  <Link onClick={navigate} className="float-end btn btn-outline-primary border-0" href={`/blog/${doc.name}`}>Read More</Link>
                </div>
              </div>)}
            </div>
          </div>
        </div>

    </main></>}
    <FooterNav />
    </>
  );
}

export default Blogs;