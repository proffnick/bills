import React, { useState, useContext } from "react";
import { auth, Auth, provider } from "../lib/firebase";
import TextInput from "./inputs/TextInput";
import Navigation from "./layout/Navigation";
import FooterNav from "./layout/FooterNav";
import Link from "next/link";
import { AppContext } from "../context/context";
import store from "../lib/storage";
import { storeKeys } from "../lib/config";
import { useRouter } from "next/router";
import { User } from "../model/Users";
import { Wallet } from "../model/Wallet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { 
    setUser,
    toggleModal,
    showLoading,
    closeLoading,
    setWallet 
  } = useContext(AppContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    // confirm password must match
    try {
      showLoading();
      const { user } = await Auth.signInWithEmailAndPassword(auth, email, password);
      if(!user){
        closeLoading();
        setError('User not found!');
        return;
      }
      // set User login
      User.loginUser(user?.stsTokenManager?.refreshToken);

      // look for the user details
      const udetails = await User.read(user.uid);
      console.log(udetails, 'user details');
      const wl = await Wallet.read(user.uid);
      console.log(wl, 'wallet');
      setWallet({...wl});
      setUser({...udetails});
      setError(null);
      closeLoading();
      toggleModal(
        'Success',
        'You are logged in',
        'success',
        'on'
      );

      setTimeout(() => {
        toggleModal('','','','off');
        const path = store.get(storeKeys.current_path);
        if((udetails?.account_type) === 'admin'){
          return router.push('/admin');
         }
        if(path){
          router.push(path);
        }else{
          router.push('/');
        }
      }, 2000);
    } catch (error) {
      closeLoading();
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
     const { user } = await Auth.signInWithPopup(auth, provider);
     if(!user){
      closeLoading();
      setError('User not found!');
      return;
      }
    
     // look for the user details
     showLoading();
     const udetails = await User.read(user.uid);
     console.log(udetails, 'user details');
     if(!udetails){
      closeLoading();
      setError('User not found!');
      return;
     }
     // set User login
     User.loginUser(user?.stsTokenManager?.refreshToken);
     const wl = await Wallet.read(user.uid);
     console.log(wl, 'wallet');
     setWallet({...wl});
     setUser({...udetails});
     setError(null);
     closeLoading();
     
     toggleModal(
       'Success',
       'You are logged in',
       'success',
       'on'
     );

     setTimeout(() => {
       toggleModal('','','','off');
       const path = store.get(storeKeys.current_path);
       if((udetails?.account_type) === 'admin'){
        return router.push('/admin/stats');
       }
       if(path){
         router.push(path);
       }else{
         router.push('/');
       }
     }, 2000);
   
    } catch (error) {
      console.log(error);
      closeLoading();
      setError(error.message);
    }
  };

  return (
    <>
      <Navigation />
      <main className="container-fluid pb-5" style={{
        minHeight: '100vh'
      }}>
        <div className="col col-md-6 col-lg-5 col-xl-4 mx-auto">
          <form
            className="bg-white border rounded-3 p-4 p-lg-5"
            onSubmit={handleLogin}
            autoComplete="off"
          >
            <h3 className="text-center text-muted mb-4 fs-6 fw-bolder">Quick Login</h3>
            <TextInput
              name="email"
              label="Email"
              type="email"
              action={setEmail}
              reference={null}
            />
            <TextInput
              name="password"
              label="Password"
              type="password"
              action={setPassword}
              reference={null}
            />
            <div className="form-group text-center mt-4">
              <div className="d-grid gap-2">
                <button className="btn btn-primary mb-3 btn-lg" type="submit">
                  Login
                </button>
              </div>
              {error && <div className="text-danger text-center my-2">{error}</div>}
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-danger border-0 btn-lg"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  With Google <i className="bi bi-google ms-2" style={{fontSize: '1.1rem'}}></i>
                </button>
              </div>
              <div className="my-3 d-flex justify-content-center align-items-center flex-column">
                <p className="text-center d-block mb-2 text-muted">
                  Dont have account ? <Link className="fw-bolder" href={'/register'}>Create Account</Link>
                </p>
                <p className="text-center mb-2 text-muted">
                  <Link className="fw-bolder" href={'/forgotten'}>Forgotten Password</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
      <FooterNav />
    </>
  );
};

export default Login;
