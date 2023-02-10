import { api, authApi } from "./api";
import { cors_url } from "../lib/config";
const cors = require('cors');
const admin = require("firebase-admin");
const serviceAccount = require('./quickbuy-2f0fd-firebase-adminsdk-xwk3g-d89b5029c9.json');

// initialize admin
if(admin.apps.length === 0){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const handler = async (req, res) => {
  const corsOptions = { 
    origin: cors_url, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE" 
  };
  cors(corsOptions);

  if(req.method.toLowerCase() === 'post'){
    const {
      item_code,
      biller_code,
      customer,
      type,
      email
    } = req.body;
    switch(type){
      case 'validate':{
        try {
          const cust = await api.get(`/bill-items/${item_code}/validate?code=${biller_code}&customer=${customer}`);
          console.log(cust, 'from server');
          if(!cust.ok){
            return res.status(400).send({
              status: false, 
              message: 'Customer not found',
              err: JSON.stringify(cust),
              item_code,
              biller_code,
              customer,
              type,
              path: `/bill-items/${item_code}/validate?code=${biller_code}&customer=${customer}`
            });
          }

          return res.status(200).send({
            status: true, 
            data: cust?.data?.data
          });
    
        } catch (error) {
          return res.status(404).send({
            status: false, 
            message: error.message
          });
        }
      }
      case 'payments':{
        try {
          const cust = await api.get(`/transactions?customer_email=${email}`);
          
          if(!cust.ok){
            return res.status(400).send({
              status: false, 
              message: 'No transaction',
              err: JSON.stringify(cust),
              email
            });
          }

          return res.status(200).send({
            status: true, 
            data: cust?.data?.data
          });
    
        } catch (error) {
          return res.status(404).send({
            status: false, 
            message: error.message
          });
        }
      }
      case 'charge-wallet':{

        // get required data
        const {userId, amount } = req.body;
        const walletRef = admin.firestore().collection('wallets').doc(userId);

        try {
         // Use a transaction to update the user's wallet balance and ensure consistency
          return admin.firestore().runTransaction(async (transaction) => {
            const walletDoc = await transaction.get(walletRef);
            const currentBalance = walletDoc.data().balance;

            //validate if user has enough funds
            if (amount > currentBalance) {
              return res.status(400).send({
                status: false, 
                message: 'Insufficient funds in the wallet'
              });
            }

            const newBalance = currentBalance - amount;
            transaction.update(walletRef, { balance: newBalance });

            return res.status(200).send({
              status: true, 
              newBalance
            });

          });
    
        } catch (error) {
          return res.status(400).send({
            status: false, 
            message: `Error charging wallet for user ${userId}: ${error.message}`
          });
        }
      }
      case 'refund-wallet':{
        // get required data
        const {userId, amount } = req.body;
        const walletRef = admin.firestore().collection('wallets').doc(userId);

        try {
         // Use a transaction to update the user's wallet balance and ensure consistency
          return admin.firestore().runTransaction(async (transaction) => {
            const walletDoc = await transaction.get(walletRef);
            const currentBalance = walletDoc.data().balance;
            const newBalance = currentBalance + amount;
            transaction.update(walletRef, { balance: newBalance });

            return res.status(200).send({
              status: true, 
              newBalance
            });

          });
    
        } catch (error) {
          return res.status(400).send({
            status: false, 
            message: `Error charging wallet for user ${userId}: ${error.message}`
          });
        }
      }
      case 'get-user': {
        try {
          //take token and check
          const token = req.body.token;
          const result = await authApi.post(
            `/token?key=${process.env.NEXT_PUBLIC_GC_KEY}`, 
            {
              grant_type: 'refresh_token',
              refresh_token: token
            }
          );

          return res.json({ status: true, auth: result.data });

        } catch (error) {
          return res.status(404).send({
            status: false, 
            message: error.message
          });
        }
      }
      case 'pay-bill':{
        const { details } = req.body;
        try {
          const billed = await api.post(`/bills`, {...details});
          if(!billed.ok){
            return res.status(400).send({
              status: false,
              ok: false,
              data: billed?.data
            });
          }
          return res.status(200).send({
            status: true,
            ok: true,
            data: billed?.data 
          });
        } catch (error) {
          return res.status(404).send({
            status: false, 
            message: error.message,
            data: null
          });
        }
      }
      case 'get-bill':{
        const { ref } = req.body;
        try {
          const retry =  await api.get(`/bills/${ref}`);
          if(!retry.ok){
            return res.status(400).send({
              status: false,
              ok: false,
              data: retry?.data
            });
          }
          return res.status(200).send({
            status: true,
            ok: true,
            data: retry?.data 
          });
        } catch (error) {
          return res.status(404).send({
            status: false, 
            message: error.message,
            data: null
          });
        }
      } 
    }
  }
}

export default handler;