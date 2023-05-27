import { collection, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

/// Some usefull functions
const getUserGroup = async (
  collectionName: string,
  documentId: string,
  parameterName: string
) => {
  const documentRef = doc(collection(FIRESTORE_DB, collectionName), documentId);
  const documentSnapshot = await getDoc(documentRef);

  if (documentSnapshot.exists()) {
    const data = documentSnapshot.data();
    const parameterValue = data?.[parameterName];
    console.log(`Valor del parámetro ${parameterName}: ${parameterValue}`);
  } else {
    console.log(
      `El documento ${documentId} no existe en la colección ${collectionName}`
    );
  }
};

export { getUserGroup };
