import TradingViewWidget from "@/components/tradingview/tradeview-chart"
import TradingViewWidgetHotMap from "@/components/tradingview/tradeview-hotmap"
import TradingViewWidgetTopStories from "@/components/tradingview/tradeview-stories"
import TradingViewWidgetQuotes from "@/components/tradingview/tradeview-quote"

export default function Home() {
  return (
    <div className="min-h-screen home-wrapper">
      <section className="grid w-full gap-4 home-section">
        <div className="md:col-span-1 xl:col-span-1 min-h-[500px]">
          <TradingViewWidget 
            title="Market Overview"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2 min-h-[600px]">
          <TradingViewWidgetHotMap 
            title="Market HeatMaps"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2 min-h-[300px]">
          <TradingViewWidgetTopStories 
            title="Market stories"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2 min-h-[300px]">
          <TradingViewWidgetQuotes 
            title="Market quotes"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
          />
        </div>
      </section>
    </div>
  )
}
