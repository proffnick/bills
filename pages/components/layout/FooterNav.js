import React from 'react';
import Link from 'next/link';
import Loader from '../Loader';

const FooterNav = () => {

  const navigate = () => {
    document.getElementById('loader').style.display = 'block';
    return true;
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom d-flex justify-content-center">
      <ul className="navbar-nav footer flex-row">
      <li className="nav-item">
            <Link onClick={navigate} href="/" className='nav-link fs-6'>Home</Link>
        </li>
        <li className="nav-item">
            <Link onClick={navigate} href="/about" className='nav-link fs-6'>About</Link>
        </li>
        <li onClick={navigate} className="nav-item">
            <Link href="/policies" className='nav-link fs-6'>Policies</Link>
        </li>
        <li onClick={navigate} className="nav-item">
            <Link href="/blog" className='nav-link fs-6'>Blog</Link>
        </li>
        <li onClick={navigate} className="nav-item">
            <Link href="/contact" className='nav-link fs-6'>Contact</Link>
        </li>
        <li onClick={navigate} className="nav-item">
            <Link href="/test" className='nav-link fs-6'>test</Link>
        </li>
      </ul>
    </nav>
    <Loader />
    </>
  );
};

export default FooterNav;
