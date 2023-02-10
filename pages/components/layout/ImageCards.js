import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ImageCard = ({ 
  name, 
  biller_code,
  type, 
  image = '/default.png',
  action
 }) => {
  return ( 
    <>
      <Link onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if(typeof window !== "undefined"){
        document.getElementById("loader").style.display = "block";
        }
        action(biller_code, type, image);
        return;
      }} href={`/details/${biller_code}`}>
        <div className="card mb-3 border px-3">
          <div className="row g-0">
            <div className="col col-sm-2 text-center d-flex align-items-center">
              <Image
                src={`${image}`}
                width={50}
                height={50} 
                alt={`${name}`}
                className={'rounded-3 shadow-sm'}
              />
            </div>
            <div className="col col-sm-10">
              <div className="card-body">
                <p className="card-title text-secondary fs-6 lh-sm fw-bold">{ (type === 'cable') ? 'Subscription Packages': ((type == 'power')? name.split(' ')[0] : (type == 'internet' && biller_code == 'BIL125')? 'Spectranet Subscription': (biller_code === "BIL124") ? 'SMILE Data Subscription': name) }</p>
                <p className="card-text fs-5 text-muted fs-6 lh-sm">Buy { type }</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
    
  );
};

export default ImageCard;