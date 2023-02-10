import React, { useState, useContext } from "react";
import { auth, Auth, provider } from "../lib/firebase";
import TextInput from "./inputs/TextInput";
import SelectTypeInput from "./inputs/SelectTypeInput";
import Navigation from "./layout/Navigation";
import FooterNav from "./layout/FooterNav";
import Link from "next/link";
import { AppContext } from "../context/context";
import { User } from "../model/Users";
import { Wallet } from "../model/Wallet";
import store from "../lib/storage";
import { storeKeys } from "../lib/config";
import { useRouter } from "next/router";

const Register = () => {
  const { 
    showLoading, 
    closeLoading, 
    toggleModal,
    setUser,
    setWallet 
  } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [accountType, setAccountType] = useState('');
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const types = [{
    personal: 'Let you quickly buy and manage your bills at any time.',
    business: 'Earn good commision on every purchase. Minimun deposit starts from N10,000'
  }];

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError("Passwords do not match");
        setValid(false)
    } else if (!fullName.trim().includes(" ") || fullName.length > 150) {
        setError("Full name must be a two word string and not longer than 150 characters");
        setValid(false)
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setError("Please enter a valid email address");
        setValid(false)
    } else if(!accountType){
        setError("Please select account type");
        setValid(false)
    }else {
        try {
          showLoading();
          const { user } = await Auth.createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          
          console.log(user);

          const usr = {
            email: user.email,
            id: user.uid,
            fullName: fullName,
            created_at: new Date(),
            account_type: accountType

          }

          await User.create(usr).then(() => {
            User.loginUser(user?.stsTokenManager?.refreshToken);
            setUser({...usr});
          });
          const wll = {
            email: user.email,
            id: user.uid,
            created_at: new Date(),
            balance: 5.0
          }
          await Wallet.create(wll);
          setWallet({...wll})
          closeLoading();
          setError(null);

          toggleModal(
            'Success',
            'Registration successful',
            'success',
            'on'
          );

          setTimeout(() => {
            toggleModal('','','','off');
            const path = store.get(storeKeys.current_path);
            if(path){
              router.push(path);
            }else{
              router.push('/');
            }
          }, 2000);

        } catch (error) {
          setError(error.message);
        }
    }
  };
  const handleGoogleSignUp = async () => {

    try {
        if(!accountType?.length){
          toggleModal(
            'Select Account Type',
            'Please select account type before proceeding',
            'danger',
            'on'
          );
          return;
        }
        const { user } = await Auth.signInWithPopup(auth,provider);

        console.log(user, 'sined in user');

        const found = await User.read(user.uid);

        console.log(found, 'found user', user?.stsTokenManager?.refreshToken);

        if (found) {
            setError("User already exists");
        } else {
          const ud = {
            email: user.email,
            id: user.uid,
            fullName: user.displayName,
            created_at: new Date(),
            account_type: accountType
            }

            await User.create(ud).then(() => {
              console.log('user logged');
              User.loginUser(user?.stsTokenManager?.refreshToken);
              setUser({...ud});
            });
            const wll = {
              email: user.email,
              id: user.uid,
              created_at: new Date(),
              balance: 5.0
            }
            await Wallet.create(wll);
            setWallet({...wll});
            setError(null);
            toggleModal(
              'Success',
              'Registration successful',
              'success',
              'on'
            );
  
            setTimeout(() => {
              toggleModal('','','','off');
              const path = store.get(storeKeys.current_path);
              if(path){
                router.push(path);
              }else{
                router.push('/');
              }
            }, 2000);
        }
    } catch (error) {
        setError(error.message);
    }
};


  const handleType = (value) => {
    if(value){
      const msg = types?.[0]?.[value];
      setAccountType(value);
      if(msg){
        setMessage(msg);
      }else{
        setMessage('');
      }
    }
  }


  return (
    <>
      <Navigation />
        <main className="container-fluid pb-5" style={{
          minHeight: '100vh'
        }}>
          <div className="col col-md-6 col-lg-5 col-xl-4 mx-auto">
            <form
              className="bg-white border rounded-3 p-4 p-lg-5"
              onSubmit={handleRegister}
              autoComplete="off"
            >
              <h3 className="text-center text-muted mb-4 fs-6 fw-bolder">Quick Account</h3>
              <SelectTypeInput 
                id={'AccountType'}
                name={'account_type'}
                label={'Select Account Type'}
                action={handleType}
                data={[
                  {
                    name: 'Personal Account', 
                    value: 'personal'
                  },
                  {
                    name: 'Merchant (Business)', 
                    value: 'business'
                  }]}
              />
              {message&&<div className="alert alert-info">
                {message}
              </div>}
              <TextInput
                name="fullName"
                label="Full Name"
                type="text"
                action={setFullName}
                reference={null}
              />
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
              <TextInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                action={setConfirmPassword}
                reference={null}
              />
              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-primary btn-lg" type="submit">
                  Create Account
                </button>
              </div>
              {error && <div className="text-danger text-center mt-3">{error}</div>}
              {valid && <div className="text-success pt-3 text-center">Success!</div>}
              <div className="d-grid gap-2 mt-4">
                <button type="button"  className="btn btn-outline-danger border-0 btn-lg" onClick={handleGoogleSignUp}>Sign Up with Google</button>
              </div>
              <div className="form-group text-center mt-3 ">
                <Link
                  className="btn btn-sm btn-outline-secondary border-0 btn-lg border-0"
                  href={'/login'}>
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </main>
      <FooterNav />
    </>
  );
};

export default Register;
