// WatchlistRow.tsx
"use client";

import Link from "next/link";
import WatchlistButton from "@/components/WatchlistButton";

interface Quote {
  price: number;
  change: number | null;
  changePercent: number | null;
}

interface Props {
  symbol: string;
  company: string;
  userId: string;
  quote: Quote | null;
}

export default function WatchlistRow({ symbol, company, userId, quote }: Props) {
  // Safe check if change exists, otherwise default to 0
  const isPositive = (quote?.change ?? 0) >= 0;

  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="px-4 py-3">
        <Link href={`/stocks/${symbol}`} className="font-bold text-yellow-400 hover:underline">
          {symbol}
        </Link>
      </td>
      <td className="px-4 py-3 text-gray-300 max-w-[140px] truncate">
        <Link href={`/stocks/${symbol}`} className="hover:text-white transition-colors">
          {company}
        </Link>
      </td>
      <td className="px-4 py-3 text-right font-medium">
        {quote ? `$${quote.price.toFixed(2)}` : <span className="text-gray-600">—</span>}
      </td>
      <td className={`px-4 py-3 text-right text-xs font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
        {/* Check if quote AND change/changePercent properties are not null */}
        {quote && quote.change !== null && quote.changePercent !== null ? (
          <>
            {isPositive ? "+" : ""}{quote.change.toFixed(2)} ({isPositive ? "+" : ""}{quote.changePercent.toFixed(2)}%)
          </>
        ) : (
          <span className="text-gray-600">—</span>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        <WatchlistButton
          symbol={symbol}
          company={company}
          userId={userId}
          isInWatchlist={true}
          type="icon"
        />
      </td>
    </tr>
  );
}
