import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { getSingleDocFromCollectionRef } from "./GenericFunctions";

// global data used in the services
const userId = localStorage.getItem("user_uid");
let liveRef: any;
if (userId) {
  liveRef = doc(collection(db, "Admin"), "live");
} else {
  console.error("userId is not defined");
}

export const getUserDetailsService = async (): Promise<any> => {
  if (userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    localStorage.setItem("user-settings", JSON.stringify(docSnap.data()));

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
};

export const updateUserDetailsService = async (data: any): Promise<any> => {
  if (userId) {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await setDoc(docRef, data);
    } catch (error) {
      console.log("Error setting document:", error);
    }
  }
};

export const getLiveDetails = () => {
  const data = getSingleDocFromCollectionRef(liveRef);
  return data;
};
