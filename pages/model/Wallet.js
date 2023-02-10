import DB from "./db";

class Wallets extends DB {
  constructor(collection){
    super(collection);
    this.collection = collection;
    return this;
  }
}

const Wallet = new Wallets('wallets');

export {
  Wallet
} 