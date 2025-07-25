import { ListView } from "@/components/pages/lista/ListView";
import { getListItems } from "@/services/firestore/getListItems";
import { notFound } from "next/navigation";

export default async function ListPage({ params }) {
  const awaitedParams = await params;
  const slug = decodeURIComponent(awaitedParams.listTitle);
  const [titleSlug, listId] = slug.split("--id");

  if (!listId || !titleSlug) return notFound();

  try {
    const listItems = await getListItems();
    return (
      <>
        <ListView listTitle={titleSlug} listItems={listItems} />
      </>
    );
  } catch (error) {}
}
