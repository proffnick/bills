import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const IconCard = ({ 
  title, 
  value, 
  icon, 
  iconSize = '2rem',
  iconColorClass = ''
 }) => {
  const router = useRouter();

  const navigate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(typeof window !== "undefined"){
      document.getElementById("loader").style.display = "block";
    }
    router.push(`/service/${value}`);
  }

  return ( 
    <div className="col">
      <Link onClick={navigate} href={''}>
        <div className="card text-center border">
          <div className="card-body">
            <i className={`bi bi-${icon} ${iconColorClass}`} style={{fontSize: iconSize}}></i>
            <p className="card-text">{title}</p>
          </div>
        </div>
      </Link>
    </div>
    
  );
};

export default IconCard;