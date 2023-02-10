import React from 'react';
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='container'>
    <div className="d-flex align-items-center justify-content-center h-100" style={{minHeight: '100vh'}}>
      <div className="text-center">
        <h1 className='text-muted'>404 Not Found</h1>
        <p className='text-secondary'>Sorry, looks like what your looking for does not exists.</p>
        <Link href='/' className='btn btn-outline-primary rounded-pill'>Back to home</Link>
      </div>
    </div>
    </div>
  );
};

export default NotFound;
