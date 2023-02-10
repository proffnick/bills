import { useRef } from "react";
import useAppContext from "@/pages/context/useAppContext";
import { Auth } from "@/pages/lib/firebase";
import { User } from "@/pages/model/Users";
import { useRouter } from "next/router";
import Link from "next/link";
export const Canvas = () => {
  const router = useRouter();
  const cref =  useRef();
  const { 
    user, 
    setUser, 
    setWallet,
    bstp
  } = useAppContext();

  const logout = async (e) => {
    const l = e.target;
    l.setAttribute('disabled', true);
    try {
      await Auth.getAuth().signOut();
      User.logoutUser();
      setUser(null);
      setWallet(null);
      router.push('/');
    } catch (error) {
      console.log(error.message);
    }
  }
  const closeCanvas = () => {
    try {
      if(bstp){
        const off = new bstp.Offcanvas(cref.current);
        off.hide();
      }
    } catch (error) {
      console.log();
    }
  }

  return (
    <>
      <div ref={cref} className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header bg-light">
          <h5 className="offcanvas-title text-muted" id="offcanvasRightLabel">Quick Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li 
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasRight" 
            className="nav-item">
            <Link onClick={closeCanvas} className="nav-link" href={`/`}>
              <i  className="bi bi-house-door-fill me-2"></i>Home</Link>
            </li>
            <li 
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasRight"
              className="nav-item">
            {(user)&&<Link onClick={closeCanvas} className="nav-link" href={`/user/${user.id}`}>
              <i  className="bi bi-person-circle me-2"></i>Account</Link>}
            </li>
            <li 
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasRight"
              className="nav-item">
            {(user?.account_type === 'admin')&&<Link onClick={closeCanvas} className="nav-link" href="/admin/stats">
              <i  className="bi bi-columns-gap me-2"></i>Admin</Link>}
            </li>
            <li 
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasRight"
            className="nav-item">
            <Link onClick={closeCanvas} className="nav-link" href="/wallet"><i className="bi bi-wallet me-2"></i> Wallet</Link>
            </li>
            <li
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasRight" 
            className="nav-item">
            <Link 
              onClick={logout}  
              type='button' 
              className="nav-link text-danger" href="#">
              <i className="bi bi-box-arrow-right me-2"></i> Log Out
            </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}