import { Edit } from "@/components/pages/lista/editar/Edit";
import { getUserLists } from "@/services/firestore/getUserLists";
import { notFound } from "next/navigation";

export default async function EditList() {
  try {
    const lists = await getUserLists();

    return <Edit list={lists[0]} />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
