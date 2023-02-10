
const base_url = process.NODE_ENV === 'production' ? 'https://api.flutterwave.com/v3': 'https://api.flutterwave.com/v3';
const api_url = process.NODE_ENV === 'production' ? 'https://buyquick.ng/api/flw': 'http://localhost:3000/api/flw';
const cors_url = process.NODE_ENV === 'production' ? 'https://buyquick.ng': 'http://localhost';
const google_url = 'https://securetoken.googleapis.com/v1';


const churches = [
  "WINNERS CHAPEL",
  "Salvation Ministries",
  "RCCG Covenant Partners",
  "House on the Rock",
  "GRACE ASSEMBLY",
  "Christ Embassy",
  "Catholic Archdiocese of Lagos"
];

const tv = [
  "dstv",
  "gotv",
  "startimes"
];

const others = [
  "DHL shipping payments",
  "Multichoice Dealer POS Payments",
  "Federal Inland Revenue Service",
]

const storeKeys = {
  current_transaction: 'ct',
  current_data: 'cd',
  current_path: 'cp',
  current_session: 'Auth Token'
}

const charges = {
  airtime: 0,
  data_bundle: 0,
  power: 100,
  internet: 100,
  cable: 100,
  others: 100,
  church: 50,
  business_min: 10000
}
const  generateUniqueID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 25; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}


export {
  base_url,
  api_url,
  cors_url,
  google_url,
  churches,
  tv,
  others,
  storeKeys,
  charges,
  generateUniqueID as getUnique
}