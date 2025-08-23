"use client";

import { Add } from "@/components/pages/lista/agregarItem/Add";
import { useParams } from "next/navigation";

export default function Agregar() {
  const params = useParams();
  const slug = decodeURIComponent(params.listTitle);
  const [listTitle, listId] = slug.split("--id");

  return <Add listTitle={listTitle} listId={listId} />;
}
