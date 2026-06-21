// WatchlistNews.tsx
import { getNews } from "@/lib/actions/finnhub.actions";
import { getWatchlistSymbolsByUserId } from "@/lib/actions/watchlist.actions";

export default async function WatchlistNews({ userId }: { userId: string }) {
  const items = await getWatchlistSymbolsByUserId(userId);
  const symbols = items.map((i) => i.symbol);
  const news = await getNews(symbols.length > 0 ? symbols : undefined);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white">
        {symbols.length > 0 ? "News for Your Watchlist" : "Market News"}
      </h2>

      <div className="flex flex-col gap-3">
        {news.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors group"
          >
            {article.image && (
              <img
                src={article.image}
                alt=""
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex flex-col gap-1 min-w-0">
              {article.symbol && (
                <span className="text-yellow-400 text-xs font-semibold">{article.symbol}</span>
              )}
              <p className="text-white text-sm font-medium line-clamp-2 group-hover:text-yellow-100 transition-colors">
                {article.headline}
              </p>
              <p className="text-gray-500 text-xs">{article.source}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}