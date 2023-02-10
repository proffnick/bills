import React, { useContext } from 'react';
import { AppContext } from '@/pages/context/context';

function Messaging({ message, title, status }) {
  
  const { toggle } = useContext(AppContext);

  return (
    <div id="messaging" className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow-sm">
          <div className={`modal-header border-0 py-2 bg-${status} rounded-top`}>
            <h5 className="modal-title border-0 text-light">{title}</h5>
            <button
              onClick={() => toggle('off')} 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close"></button>
          </div>
          <div className="modal-body py-5">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
