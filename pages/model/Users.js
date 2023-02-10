import DB from "./db";
import { storeKeys } from "../lib/config";

class Users extends DB {
  constructor(collection){
    super(collection);
    this.collection = collection;
    return this;
  }

  loginUser(token){
    if(typeof window !== 'undefined' && token){
      sessionStorage.setItem(storeKeys.current_session, token);
    }
  }
  logoutUser(){
    if(typeof window !== 'undefined'){
      sessionStorage.removeItem(storeKeys.current_session);
    }
  }
}

const User = new Users('users');

export {
  User
} 