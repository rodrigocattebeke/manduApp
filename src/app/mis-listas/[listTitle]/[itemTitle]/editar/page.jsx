import { Edit } from "@/components/pages/item/editar/Edit";
import { getListItem } from "@/services/firestore/getListItem";
import { notFound } from "next/navigation";

export default async function Editar() {
  try {
    const item = await getListItem();

    return <Edit item={item} />;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
