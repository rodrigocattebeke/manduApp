import { Timestamp } from "firebase/firestore";

export const formattedFirestoreTimestamp = (timestamp) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  let formattedDate;
  let date;
  if (typeof timestamp == "object") {
    date = timestamp.toDate();
  } else {
    date = new Date(timestamp);
  }
  formattedDate = date.toLocaleDateString("es-ES", options);

  return formattedDate;
};
