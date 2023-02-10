import { create } from "apisauce";
import { base_url, api_url, google_url } from "../lib/config";

const api = create({
  baseURL: base_url,
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${process.env.FLS}`
  }
});

const authApi = create({
  baseURL: google_url,
  headers: {
    contentTyle: 'application/json'
  }
});

const customApi = create({
  baseURL: api_url,
  headers: {
    accept: 'application/json'
  }
});



export {
  api,
  customApi,
  authApi
}