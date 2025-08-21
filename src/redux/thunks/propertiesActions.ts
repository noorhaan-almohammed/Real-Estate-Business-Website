import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { setProperties, setLoading, setError, type Property } from "../Slices/propertiesSlice";
import { db } from "../../firebaseConfig";
import type { AppDispatch } from "../store";

export const subscribeToProperties = () => (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));

    // onSnapshot = Real-time updates
    return onSnapshot(q, (snapshot) => {
      const properties: Property[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Property[];

      dispatch(setProperties(properties));
    });
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};
