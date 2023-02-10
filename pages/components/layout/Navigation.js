import Link from 'next/link';
import Image from 'next/image';
import { useRef, useContext } from 'react';
import { AppContext } from '@/pages/context/context';
import { useRouter } from 'next/router';


const Navigation = () => { 
  const navbar  = useRef();
  const router = useRouter();
  const {
    wallet,
    user
  } = useContext(AppContext);

  const toggleMemu = (e) => {
    const classList = navbar.current.classList;
    if(navbar.current){
      if(classList.contains('show')){
        classList.remove('show');
      }else{
        classList.add('show');
      }
    }
  }

  const goBack = () => {
    try {
      if(router.pathname !== '/'){
        document.getElementById('loader').style.display = 'block';
        router.back();
      }
    } catch (error) {
      
    }
  }

  return (
  <nav className="navbar container navbar-expand-lg navbar-light  d-flex align-self-start">
    <div className='container-fluid'>
      <Link onClick={goBack} href="/" className="navbar-brand">
        
        {router.pathname === '/' ? <Image
          src="/min.png"
          alt="Our Logo"
          className={`rounded`}
          width={57}
          height={57}
          priority
        />: <button
          style={{minWidth: '37px', minHeight: '37px'}}
          className='rounded-circle shadow-sm btn btn-primary'>
            <i 
            className='bi bi-arrow-left fw-bolder text-white' 
            style={{fontSize: '1.2rem'}}></i>
          </button>
        }
      </Link>
      <button onClick={toggleMemu} className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="bi bi-list text-primary" style={{fontSize: "2rem"}}></i>
      </button>
      <div ref={navbar} className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav d-flex justify-content-center">
          
        </ul>
        <div className="mx-0 ms-lg-auto d-flex align-content-center align-items-center justify-content-center d-md-block">
          {!user && <>
          <Link href="/login">
            <button className="btn border-0 rounded-3 btn-primary me-2 fw-normal">Log In</button>
          </Link>
          
          <Link href="/register">
            <button className="btn border-0 rounded-3  btn-primary me-2 fw-normal">Create Account</button>
          </Link>
          </>
          }
          {user && <>
            <Link 
            className='rounded-circle p-0 me-2 btn btn-light shadow-sm'
            style={{
              width: '30px',
              height: '30px'
            }} 
            href={`/user/${user.id}`}>
              <i className='bi bi-person-fill' style={{
                fontSize: '1.2rem'
              }}></i>
            </Link>
          </>}
          {wallet && <button onClick={() => router.push('/wallet')} className='btn btn-sm btn-light rounded-pill fw-bold text-muted shadow-sm me-2'>bal: <span className='badge text-bg-secondary rounded-pill'>{parseFloat(wallet.balance).toFixed(2)}</span></button>}
          {user &&<div className="dropdown d-inline">
            <button 
              style={{width: 30, height: 30}} 
              className="btn btn-light dropdown-toggle btn-sm  p-0 border-0 rounded-circle fw-normal shadow-sm" type="button" 
              data-bs-toggle="offcanvas" 
              data-bs-target="#offcanvasRight" 
              aria-controls="offcanvasRight"
              >{''}
            </button>
            
          </div>}
        </div>
      </div>
    </div>
  </nav>
)}

export default Navigation;
