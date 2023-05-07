import { storage } from "/src/firebase.js";

class FirebaseStorage {
    constructor() {
      this.storageRef = storage.ref();
    }
  
    getInstance() {
      return this.storageRef;
    }
  }
  
  export default FirebaseStorage;
