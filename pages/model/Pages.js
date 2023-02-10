import DB from "./db";

class Pages extends DB {
  constructor(collection){
    super(collection);
    this.collection = collection;
    return this;
  }
}

const Page = new Pages('pages');

export {
  Page
} 