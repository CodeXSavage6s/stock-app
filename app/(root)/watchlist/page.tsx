<<<<<<< HEAD
export default function WatchListPage() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-300 mb-2">Your watchlist is empty</h2>
        <p className="text-gray-500">Start adding stocks to track them here</p>
      </div>
    </div>
  )
=======
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getWatchlistSymbolsByUserId } from "@/lib/actions/watchlist.actions";
import { getQuote } from "@/lib/actions/finnhub.actions";
import WatchlistTable from "@/components/watchlist/WatchlistTable";
import WatchlistNews from "@/components/watchlist/WatchlistNews";

export default async function WatchlistPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in");

  const userId = session.user.id;

  const items = await getWatchlistSymbolsByUserId(userId);

  const itemsWithQuotes = await Promise.all(
    items.map(async (item) => {
      const quote = await getQuote(item.symbol);
      return { ...item, quote };
    })
  );

  return (
    <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col gap-6">
          <WatchlistTable userId={userId} items={itemsWithQuotes} />
        </div>
        <div className="flex flex-col gap-6">
          <WatchlistNews userId={userId} symbols={items.map((i) => i.symbol)} />
        </div>
      </section>
    </div>
  );
>>>>>>> d09b210 (setup watchlist page)
}