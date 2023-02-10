import React, { useContext } from 'react';
import { AppContext } from '@/pages/context/context';
import Messaging from './Messaging';
import DataViewer from './ViewData';
import { Wallet } from '@/pages/model/Wallet';
import { User } from '@/pages/model/Users';
import { Auth } from '@/pages/lib/firebase';
import { customApi } from '@/pages/api/api';
import { storeKeys } from '@/pages/lib/config';
import { Canvas } from './Canvas';

//NEXT_PUBLIC_GC_KEY
const FullScreenWrapper = ({ children }) => {
  const { 
    modalContent,
    status,
    content,
    user, 
    setUser,
    setWallet,
    showLoading,
    closeLoading
   } = useContext(AppContext);

  const checkAuth = React.useCallback(async () => {
    try {
      if(user) return;
      if(typeof document === 'undefined') return;

      const current = Auth.getAuth().currentUser;
      //console.log(current);
      if((current?.uid)){
        showLoading();
        let u = await User.read((current?.uid));
        if(u) setUser({...u});
        let w = await Wallet.read((current?.uid));
        if(w) setWallet({...w});
        closeLoading();
      }else{
        const token = sessionStorage.getItem(storeKeys.current_session);

        if(token){
          showLoading();
          const result = await customApi.post('/', {
            type: 'get-user',
            token: token
          });
          
          if((result?.data?.auth?.user_id)){
            const uid = (result?.data?.auth?.user_id);
            let u = await User.read(uid);
            //console.log(u, 'authenticated');
            if(u) setUser({...u});
            let w = await Wallet.read(uid);
            //console.log(w);
            if(w) setWallet({...w});
          }
          closeLoading();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);


  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <div style={{minHeight: '100vh'}} className="h-100 m-0 p-0">
      {children}
      <DataViewer
        data={content.data} 
        title={content.title}
        status={content.status}
      />
      <Messaging
        message={modalContent?.message}
        title={modalContent?.title}
        status={status}
      /> 
      <Canvas user={user} />
    </div>
  );
};

export default FullScreenWrapper;