import { useContext } from "react";
import { AppContext } from "./context";

export default function useAppContext(){
  const {
    user,
    setUser,
    wallet,
    setWallet,
    info,
    bstp,
    showLoading,
    closeLoading,
    toggleModal
  } = useContext(AppContext);

  return {
    user,
    bstp,
    setUser,
    wallet,
    setWallet,
    info,
    showLoading,
    closeLoading,
    toggleModal
  }
}