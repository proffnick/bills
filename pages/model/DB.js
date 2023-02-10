import { db } from "../lib/firebase";
import { 
  setDoc, 
  doc, 
  getDoc,
  query, 
  orderBy,
  startAfter, 
  limit,
  where, 
  getDocs,
  deleteDoc,
  collection 
} from "firebase/firestore";

class DB {
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  async create(data) {
    try {
      const docRef = doc(db, this.collection, data.id);
      await setDoc(docRef, data);
      return true;
    } catch (error) {
      console.error(`Error adding document to ${this.collection}: `, error);
      throw error;
    }
  }

  async read(docId) {
    try {
      const docRef = doc(db, this.collection, docId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return docSnap.data();
    } catch (error) {
      console.error(`Error reading document from ${this.collection}: `, error);
      throw error;
    }
  }

  async find(child, value, sign = '==') {
    try {
      let qr = query(
        collection(db, this.collection), 
        where(child, sign, value),
        orderBy('created_date', 'desc')
        );
      const docSnap = await getDocs(qr);
      const current = docSnap.docs.map(doc => doc.data());
      if (!current.length) return null;
      return current[0];
    } catch (error) {
      throw error;
    }
  }

  async getAll(
    startsAfter = null,
    orderedBy = 'created_at', 
    Where = null,  
    lim = 10) {
    try {
      const ob = orderedBy.split(',');

      let qr = query(
        collection(db, this.collection), 
        orderBy(ob?.[0],(ob?.[1]? ob?.[1]: 'asc')), 
        limit(lim)
        );

      if (startsAfter && Where) {
        const splitW = Where.split(',');
        qr = query(
          collection(db, this.collection), 
          where(splitW?.[0], splitW?.[1], splitW?.[2]),
          orderBy(ob?.[0],(ob?.[1]? ob?.[1]: 'asc')), 
          startAfter(startsAfter), 
          limit(lim));
      }
      
      if (!startsAfter && Where) {
        const splitW = Where.split(',');
        qr = query(
          collection(db, this.collection),
          where(splitW?.[0], splitW?.[1], splitW?.[2]),  
          orderBy(ob?.[0],(ob?.[1]? ob?.[1]: 'asc')), 
          limit(lim));
      }
      const snapshots  = await getDocs(qr);
      const documents  = snapshots.docs.map(doc => doc.data());
      const lastVisible = snapshots.docs[snapshots.docs.length - 1];
      return { documents, lastVisible};
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    }
  }

  async update(docId, data) {
    try {
      const docRef   = doc(db, this.collection, docId);
      const docSnap  = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error(`Document with ID ${docId} not found in collection ${this.collection}`);
      }
      await setDoc(docRef, data);
      return true;
    } catch (error) {
      console.error(`Error updating document in ${this.collection}: `, error);
      throw error;
    }
  }

  async delete(docId) {
    try {
      const docRef   = doc(db, this.collection, docId);
      const docSnap  = await getDoc(docRef);
      if (!docSnap.exists()) {
        return null;
      }
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document from ${this.collection}: `, error);
      throw error;
    }
  }
}

export default DB;