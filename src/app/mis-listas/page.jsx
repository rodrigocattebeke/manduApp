import { MyLists } from "@/components/pages/myLists/MyLists";
import { getUserLists } from "@/services/firestore/getUserLists";
import { notFound } from "next/navigation";

export default async function MisListas() {
  const userLists = await getUserLists();

  if (!userLists) return notFound();

  return <MyLists lists={userLists}></MyLists>;
}
