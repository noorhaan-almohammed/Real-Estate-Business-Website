import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import type { FaqItem } from "../../types/Home/HomeTypes";
import type { AppDispatch } from "../store";
import { setFaqs, setFaqsError, setFaqsLoading } from "../Slices/faqsSlice";
import { db } from "../../firebaseConfig";

export const subscribeToFaqs = () => (dispatch: AppDispatch) => {
  try {
    dispatch(setFaqsLoading(true));
    const q = query(collection(db, "faqs"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const faqs: FaqItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<FaqItem, "id">),
        }));
        dispatch(setFaqs(faqs));
      },
      (error) => {
        dispatch(setFaqsError(error.message));
      }
    );

    return unsubscribe;
  } catch (err: any) {
    dispatch(setFaqsError(err.message));
    return () => {};
  }
};
