import DB from "./db";

class WalletHistories extends DB {
  constructor(collection){
    super(collection);
    this.collection = collection;
    return this;
  }
}

const WH = new WalletHistories('wallet_history');

export {
  WH
} 