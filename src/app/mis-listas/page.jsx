import { MyLists } from "@/components/pages/mis-listas/MyLists";
import { getUserLists } from "@/services/firestore/getUserLists";
import { notFound } from "next/navigation";

export default async function MisListas() {
  try {
    const userLists = await getUserLists();

    return <MyLists lists={userLists}></MyLists>;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
