import { Console } from "console";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
  getMetadata,
  deleteObject
} from "firebase/storage";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  setDoc,
  query,
  where
} from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { getDataFromCollectionRef } from "./GenericFunctions";
import { triggerMessage } from "../../components/common/snackbar";
import { checkIfPresentInFav } from "./QuotesActions";

// global data used in the services
const userId = localStorage.getItem("user_uid");
// goinig inside userData and inside links
let BackgroundColRef: any;
let userDataRef: any;
if (userId) {
  userDataRef = doc(collection(db, "userData"), userId);
  BackgroundColRef = collection(userDataRef, "background");
} else {
  console.error("userId is not defined");
}

export const uploadBackgroundImage = async (file: File) => {
  const storageRef = ref(storage, `/files/${userId}/background/${file.name}`);
  const uploadTask = await uploadBytesResumable(storageRef, file);
  const fileUrl = await getDownloadURL(storageRef);
  const fileMetaData = await getMetadata(storageRef);

  await addDoc(BackgroundColRef, {
    name: fileMetaData.name,
    created_at: fileMetaData.timeCreated,
    url: fileUrl
  });

  if (fileUrl) return true;
  else return false;
};

export const getAllImages = async () => {
  const imagesData = await getDataFromCollectionRef(BackgroundColRef);
  return imagesData?.data;
};

// // // ====================== add a quote my quote fav  ==============================
let docref: any;
let FavColRef: any;
if (userId) {
  docref = doc(collection(db, "userData"), userId);
  if (userId) FavColRef = collection(docref, "favorite");
} else {
  console.error("userId is not defined");
}

// basic post function
// function to add my quotes to the database
export const addFavoriteServicePicture = async (
  id: string,
  url: string,
  name: string,
  created_at: string
): Promise<any> => {
  try {
    const isPresent = await checkIfPresentInFav(id);
    console.log(isPresent);
    if (isPresent) {
      console.log("already present");
      triggerMessage(
        "This picture is already present in your favorite list.",
        "fail"
      );
    } else {
      setDoc(doc(FavColRef, id), {
        id: id,
        url: url,
        name: name,
        created_at: created_at,
        type: "picture"
      });
      triggerMessage("Picture added to favourite.", "success");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getFavouritePictureService = async (): Promise<any> => {
  try {
    const querySnapshot = await query(
      FavColRef,
      where("type", "==", "picture")
    );
    const pictureData = await getDocs(querySnapshot);
    const resData: any = [];
    pictureData.forEach(doc => {
      const data = {
        id: doc.id,
        data: doc.data()
      };
      resData.push(data);
    });

    return { success: true, data: resData };
  } catch (error: any) {
    return { error: error.message };
  }
};

// // ====================== get all public quotes ==============================

// going inside userData and inside links
let publicQuotesRef: any;
let allQuotes: any;
if (userId) {
  publicQuotesRef = doc(collection(db, "Admin"), "public_pictures");
  allQuotes = collection(publicQuotesRef, "pictures");
} else {
  console.error("userId is not defined");
}

export const getAllPublicPicturesService = async (): Promise<any> => {
  try {
    const querySnapshot = await getDocs(allQuotes);
    const resData: any = [];
    querySnapshot.forEach(doc => {
      const data = {
        id: doc.id,
        data: doc.data()
      };
      resData.push(data);
    });

    return { success: true, data: resData };
  } catch (error: any) {
    return { error: error.message };
  }
};

if (userId) FavColRef = collection(docref, "favorite");
export const deletePicture = async (
  id: string,
  file_name: string,
  type: string
): Promise<any> => {
  console.log(id, file_name, type);
  const desertRef = ref(storage, `/files/${userId}/background/${file_name}`);
  const checkIfPresentInFavRes = await checkIfPresentInFav(id);
  const checkIfPresentInFavBackgroundRes = await checkIfPresentInBackground(id);
  const currentPictureRef = doc(BackgroundColRef, id);
  const currentPictureRefBackground = doc(FavColRef, id);

  if (type === "my_pictures" && !checkIfPresentInFavRes) {
    await deleteObject(desertRef);
  }
  if (type === "fav" && !checkIfPresentInFavBackgroundRes) {
    await deleteObject(desertRef);
  }

  if (type === "my_pictures") await deleteDoc(currentPictureRef);
  if (type === "fav") {
    console.log({ currentPictureRefBackground });
    await deleteDoc(currentPictureRefBackground);
  }
};

export const checkIfPresentInBackground = async (id: string): Promise<any> => {
  const docRef = doc(BackgroundColRef, id);
  let present = false;
  try {
    const doc = await getDoc(docRef);
    if (doc.exists()) {
      present = true;
    }
  } catch (error: any) {
    console.log(error);
  }
  return present;
};
