import Navigation from "./layout/Navigation";
import FooterNav from "./layout/FooterNav";

const Contact = ({ doc }) => {

  return(
    <>
    {!doc && 
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    </div>
    }
    <Navigation />
    {doc &&<main className="container-fluid pb-5" style={{
        minHeight: '100vh'
      }}>
        <div className="col col-md-9 col-lg-10 col-xl-4 mx-auto">
          <div style={{minHeight: '100vh'}} className="p-2 p-lg-5 w-100 border-start">
            <h3 className="mb-3 text-muted"></h3>
            <div dangerouslySetInnerHTML={{}}></div>
          </div>
        </div>
    </main>}
    <FooterNav />
    </>
  );
}

export default Contact;