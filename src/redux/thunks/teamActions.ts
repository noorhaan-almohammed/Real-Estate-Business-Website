import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { setTeam, setTeamLoading, setTeamError } from "../Slices/teamSlice";
import type { AppDispatch } from "../store";
import type { TeamMember } from "../../types/About/AboutType";

export const subscribeToTeam = () => (dispatch: AppDispatch) => {
  try {
    dispatch(setTeamLoading(true));

    const q = query(collection(db, "team"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const team: TeamMember[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            name: data.name,
            job: data.position, 
            image: data.profileImage, 
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : data.createdAt,
            updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toMillis() : data.updatedAt,
          };
        });

        dispatch(setTeam(team));
      },
      (error) => {
        dispatch(setTeamError(error.message));
      }
    );

    return unsubscribe;
  } catch (err: any) {
    dispatch(setTeamError(err.message));
    return () => {};
  }
};
