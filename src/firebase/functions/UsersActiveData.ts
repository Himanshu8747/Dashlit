import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { triggerMessage } from "../../components/common/snackbar";
import { db } from "../firebase-config";
import {
  getDataFromCollectionRef,
  getSingleDocFromCollectionRef
} from "./GenericFunctions";

// global data used in the services
const userId = localStorage.getItem("user_uid");
let userDataRef: any;
if (userId) {
  userDataRef = doc(collection(db, "userData"), userId);
} else {
  console.error("userId is not defined");
}

export const getUserActiveData = () => {
  const activeDataRef = doc(collection(userDataRef, "activeData"), "data");
  const data = getSingleDocFromCollectionRef(activeDataRef);
  return data;
};

export const setUserActiveData = async (params: any, type: string) => {
  const old_data: any = await getUserActiveData();
  const activeDataRef = doc(collection(userDataRef, "activeData"), "data");
  const data = {
    ...old_data?.data,
    ...params
  };
  triggerMessage(
    `This ${type} has been set. (in case you have public ${type} on please disable it)`,
    "success"
  );
  try {
    await setDoc(activeDataRef, data);
  } catch (err) {
    console.log(err);
  }
};
