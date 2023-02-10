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
        <div className="row p-0 m-0">
          <div className="col-12 col-md-2 col-lg-3 col-xl-5"></div>
          <div className="col-12 col-md-10 col-lg-9 col-xl-7 bg-white">
            <div style={{minHeight: '100vh'}} className="p-2 p-lg-5 w-100 border-start">
              <h3 className="mb-3 text-primary">{doc.title}</h3>
              <hr className="my-3"/>
              <div className="text-muted" dangerouslySetInnerHTML={{__html: doc.content}}></div>
            </div>
          </div>
        </div>
    </main>}
    <FooterNav />
    </>
  );
}

export default Contact;