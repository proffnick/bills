import { useContext } from "react";
import Navigation from "./components/layout/Navigation";
import FooterNav from "./components/layout/FooterNav";
import { WH } from "./model/WalletHistory";
import { AppContext } from "./context/context";


export default () => {
  const { user } = useContext(AppContext);

  const runTest = async (e) => {
     e.preventDefault();
      try {
        const results = await WH.find('transaction_id', 822506264);
        console.log(results);
      } catch (error) {
        console.log(error.message);
      }
  }

  return(
    <>
    <Navigation />
      <div className="col-lg-5 mx-auto mt-5">
        <button onClick={runTest} className="btn btn-primary">Test</button>
      </div>
    <FooterNav />
    </>
  )
}