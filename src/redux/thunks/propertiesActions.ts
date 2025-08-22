import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
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
