import { Timestamp } from "firebase/firestore";

export const formattedFirestoreTimestamp = (firestoreTimestamp) => {
  const date = firestoreTimestamp.toDate();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);

  return formattedDate;
};
