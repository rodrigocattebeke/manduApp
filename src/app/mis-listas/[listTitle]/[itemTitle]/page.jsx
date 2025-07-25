import { ItemView } from "@/components/pages/item/ItemView";
import { getListItem } from "@/services/firestore/getListItem";
import { notFound } from "next/navigation";

export default async function ItemPage({ params }) {
  const awaitedParams = await params;
  const slug = decodeURIComponent(awaitedParams.itemTitle);
  const [titleSlug, itemId] = slug.split("--id");

  if (!itemId || !titleSlug) return notFound();
  try {
    const item = await getListItem(itemId);

    return (
      <>
        <ItemView item={item} />
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
