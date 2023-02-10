import React, { useContext } from 'react';
import { AppContext } from '@/pages/context/context';

function DataViewer({ data = {}, title, status = 'primary' }) {

  const { info, content } = useContext(AppContext);
  React.useEffect(() => {}, [content]);

  const printData = React.useMemo(() => {
    if(Object.keys(data)?.length){
      return (<ul className="list-group list-group-flush">
        {Object.keys(data).map((d, i) => {
          return <li key={i} className='list-group-item d-flex justify-content-between align-items-start'>
            <div className="ms-2 me-auto">
             <div className="fw-bold text-muted">{d}</div>
            </div>
            <span className='text-muted fw-light'>{JSON.stringify(data[d])?.replace(/"/g, '')}</span>
          </li>
        })}
      </ul>);
    }
    return null;
  }, [(Object.keys(data).length), content]);

  return (
    <div id="dataviewer" className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow-sm">
          <div className={`modal-header border-0 py-2 bg-${status} rounded-top`}>
            <h5 className="modal-title border-0 text-light">{title}</h5>
            <button
              onClick={() => info.close()} 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close"></button>
          </div>
          <div className="modal-body py-5">
            {printData}
          </div>
          <div className='modal-footer border-0 bg-light'>
            <div className=''></div>
            <div className='d-inline ms-auto'>
              <div className='d-flex'>
              <button onClick={() => {
                info.reject();
              }} className='btn btn-danger border-0 me-3 '>Cancel</button>
              <button onClick={() => {
                info.accept();
                }} className=' btn btn-primary border-0 btn'>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataViewer;
