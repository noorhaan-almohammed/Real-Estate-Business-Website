import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
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
        const faqs: FaqItem[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            question: data.question || "",
            answer: data.answer || "",
            btnText: data.btnText || "Read More",
            readMoreLink: data.readMoreLink || "#",
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : data.createdAt,
            updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toMillis() : data.updatedAt,
          } as FaqItem;
        });

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
