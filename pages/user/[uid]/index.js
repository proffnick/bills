import React, {useContext} from "react";
import Navigation from "@/pages/components/layout/Navigation";
import FooterNav from "@/pages/components/layout/FooterNav";
import NotFound from "@/pages/components/layout/NotFound";
import { User } from "@/pages/model/Users";
import { Auth } from "@/pages/lib/firebase";
import { format } from "fecha";
import { AppContext } from "@/pages/context/context";

const UserPage = ({ userId }) => { 
  const [currectUser, setCurrentUser] = React.useState(null);
  const {showLoading, closeLoading} = useContext(AppContext);

  const getUser = React.useCallback(async () => {
      const cuser = Auth.getAuth().currentUser;
      if(cuser && (cuser?.uid == userId)){
        showLoading();
        const details = await User.read(userId);
        if(details){
          setCurrentUser({...details, image: cuser?.photoURL });
        }
        closeLoading();
      }else if(userId && !currectUser){
        showLoading();
        const details = await User.read(userId);
        closeLoading();
        if(details){
          setCurrentUser({...details});
        }
      }

  }, [userId]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);


  return (
    <>
    {!currectUser ? 
      <div className="col-12 col-lg-5 mx-auto mb-5">
        <NotFound />
      </div>: 
      <>
      <Navigation/>
        <main className="container-fluid pb-5" style={{
          minHeight: '100vh'
        }}>
          <div className="col col-md-6 col-lg-5 col-xl-4 mx-auto mt-5">
            <div className="card border rounded-3 bg-white" style={{maxWidth: '500px'}}>
                <div className="card-header border-0 d-flex justify-content-center bg-light">
                <img 
                src={(currectUser?.image) ? currectUser?.image: '/profile.png'} 
                width={100} 
                height={100} 
                className="rounded-circle" />
                </div>
                <div className="card-body py-5">
                  <h5 className="card-title text-center">{currectUser?.fullName}</h5>
                  <p className="card-text text-center">
                    <strong className="text-muted">Email:</strong> {currectUser.email}
                  </p>
                  <p className="card-text text-center">
                    <strong className="text-muted">Joined:</strong>{" "}
                    {format((new Date((currectUser?.created_at?.seconds) * 1000)), 'DD-MM-YYYY HH:mm')}
                  </p>
                </div>
            </div>
          </div>
        </main>
      <FooterNav />
      </>
    }
    </>
)};

export const getServerSideProps = async ({ params }) => {
  // Fetch user data based on ID
  try {
    return { props: { userId: params.uid } };
  } catch (error) {
    return { props: { userId: null, error: error.message } }
  }

};

export default UserPage;
