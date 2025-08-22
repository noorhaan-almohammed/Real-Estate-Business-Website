import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import type { AppDispatch } from "../store";
import { db } from "../../firebaseConfig";
import { setAchievements, setAchievementsError, setAchievementsLoading } from "../Slices/achievementsSlice";
import type { OurAchievementsCard } from "../../types/About/AboutType";

export const subscribeToAchievements = () => (dispatch: AppDispatch) => {
  try {
    dispatch(setAchievementsLoading(true));

    const q = query(collection(db, "achievements"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const achievements: OurAchievementsCard[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : data.createdAt,
            updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toMillis() : data.updatedAt,
          } as unknown as OurAchievementsCard;
        });
        dispatch(setAchievements(achievements));
      },
      (error) => {
        dispatch(setAchievementsError(error.message));
      }
    );

    return unsubscribe;
  } catch (err: any) {
    dispatch(setAchievementsError(err.message));
    return () => {};
  }
};
