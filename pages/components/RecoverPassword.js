import React, { useState, useContext } from "react";
import { auth, Auth } from "../lib/firebase";
import TextInput from "./inputs/TextInput";
import Navigation from "./layout/Navigation";
import FooterNav from "./layout/FooterNav";
import { AppContext } from "../context/context";

const RecoverPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const {
      showLoading,
      closeLoading
    } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          showLoading();
          await Auth.sendPasswordResetEmail(auth,email);
          closeLoading();
          setSuccess("An email has been sent to your email address, please follow the instructions to reset your password");
        } catch (error) {
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
                onSubmit={handleSubmit} 
                className="bg-white border rounded-3 p-4 p-lg-5">
                  <h3 className="text-center text-muted mb-4 fs-6 fw-bolder">Quick Recover</h3>
                  <TextInput
                      name="email"
                      label="Enter Your Email"
                      type="email"
                      action={setEmail}
                  />
                  <div className="d-grid gap-2 mt-4">
                    <button className="btn btn-lg btn-primary btn-block" type="submit">
                        Recover Password
                    </button>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  {success && <p className="text-success py-3 text-center">{success}</p>}
              </form>
          </div>
        </main>
      <FooterNav />
      </>
    );
};

export default RecoverPassword;
