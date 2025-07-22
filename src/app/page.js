import { HomePage } from "@/components/pages/home/HomePage";
import { getFavorites } from "@/services/firestore/getFavorites";
import { getRecentEdits } from "@/services/firestore/getRecentEdits";
import { getRecentUpdates } from "@/services/firestore/getRecentUpdates";
import { getStatusSummary } from "@/services/firestore/getStatusSummary";

export default async function Home() {
  try {
    const [statusSummary, recentUpdates, favorites, recentEdits] = await Promise.all([getStatusSummary(), getRecentUpdates(), getFavorites(), getRecentEdits()]);

    return (
      <>
        <HomePage favorites={favorites} recentEdits={recentEdits} recentUpdates={recentUpdates} statusSummary={statusSummary} />
      </>
    );
  } catch (error) {
    console.error("error en el home " + error);
  }
}
