"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import WatchlistRow from "./WatchlistRow";

interface Quote {
  price: number;
  change: number | null;
  changePercent: number | null;
}

interface WatchlistItem {
  symbol: string;
  company: string;
  addedAt: Date;
  quote: Quote | null;
}

interface Props {
  userId: string;
  items: WatchlistItem[];
}

export default function WatchlistTable({ userId, items }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">My Watchlist</h2>
        <Button className="yellow-btn" onClick={() => router.push("/search")}>
          + Add Stock
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
            <p className="text-sm">Your watchlist is empty</p>
            <Button className="yellow-btn text-sm" onClick={() => router.push("/search")}>
              Find stocks to watch
            </Button>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[500px]">
            <table className="w-full text-sm text-white">
              <thead className="bg-[#0f0f0f] text-gray-400 text-xs uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left">Symbol</th>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Change</th>
                  <th className="px-4 py-3 text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <WatchlistRow
                    key={item.symbol}
                    symbol={item.symbol}
                    company={item.company}
                    userId={userId}
                    quote={item.quote}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}