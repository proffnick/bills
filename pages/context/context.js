import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [bstp, setBstp] = React.useState(null);
  const [user, setUser] = useState(null);
  const [infoModal, setInfoModal] = useState(null);
  const [content, setContent] = useState({
    data: {name: 'Buy Quick'},
    title: 'Data Info',
    status: 'primary',
    fn: () => null,
    fnc: () => null
  });

  React.useEffect(() => {
    if(!bstp && typeof document !== undefined){
      setBstp(require('bootstrap'));
    }

  }, [bstp]);


  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "Hello world",
    message: "Nothing to show here!"
  });
  const [status, setStatus] = useState('success');
  const [wallet, setWallet] = useState(null);

  const toggle = (status = 'on') => {
    if(status == 'on' && bstp){
      if(modal){
        modal.show();
        return;
      }
      const m = new bstp.Modal('#messaging', {backdrop: 'static'});
      m.show();
      setModal(m);
    }
    if(status == 'off' && modal){
      console.log('Modal closed');
      modal.hide();
      const elem = document.querySelectorAll('.modal-backdrop.show');
      if(elem.length){
       elem.forEach(elem => elem.parentElement.removeChild(elem));
      }
    } 
  }

  const info = {
    removeElem: () => {
      const elem = document.querySelectorAll('.modal-backdrop.show');
        if(elem.length){
          elem.forEach(elem => elem.parentElement.removeChild(elem));
        }
    },
    close: () => {
      if(infoModal){
        infoModal.hide();
        // clear any element with backdrop and show
        info.removeElem();
      }
    },
    open: () => {
      if(infoModal){
        infoModal.show();
      }else{
        console.log('hapening twice?');
        let im = new bstp.Modal('#dataviewer', {backdrop: 'static'});
        im.show();
        setInfoModal(im);
      }
    },
    addInfo: (title, data, fn = () => null) => {
      setContent({
        ...content,
        data,
        title,
        fn: fn
      });
    },
    accept:() => {
      info.close();
      if(typeof content.fn === 'function') content?.fn();
    },
    reject: () => {
      info.close();
      if(typeof content.fnc === 'function') content?.fnc();
    }
  };

  const showLoading = () => {
    try {
      document.getElementById('loader').style.display = 'block';
    } catch (error) {
      console.log(error.message)
    }
  }
  const closeLoading = () => {
    try {
      document.getElementById('loader').style.display = 'none';
    } catch (error) {
      console.log(error.message)
    }
  }

  const toggleModal = (
    title,
    message,
    status,
    state
  ) => {
    if(state === 'off'){
      return toggle('off');
    }

    try {
      setModalContent({
        message,
        title
      });
      setStatus(status);
      toggle('on');

    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <AppContext.Provider value={{ 
      user,
      bstp,
      info,
      modal,
      status,
      wallet,
      toggle, 
      setUser,
      content,
      setModal,
      setStatus,
      setWallet,
      showLoading,
      toggleModal,
      modalContent,
      closeLoading,
      setModalContent
      }}>
      {children}
    </AppContext.Provider>
  );
};
