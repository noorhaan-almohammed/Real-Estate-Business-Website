import { collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { setProperties, setLoading, setError, type Property } from "../Slices/propertiesSlice";
import { db } from "../../firebaseConfig";
import type { AppDispatch } from "../store";

export const subscribeToProperties = () => (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
      const properties: Property[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : data.createdAt,
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toMillis() : data.updatedAt,
        } as Property;
      });

      dispatch(setProperties(properties));
    });
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

/**********/
export const getPropertyById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      dispatch(setError("Property not found"));
      dispatch(setLoading(false));
      return;
    }

    const data = docSnap.data();

    const property: Property = {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : data.createdAt,
      updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : data.updatedAt,
    } as Property;

    dispatch(setProperties([property])); 
    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};