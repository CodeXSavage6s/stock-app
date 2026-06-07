"use client"

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetQuotesProps {
  title?: string;
  scriptUrl?: string;
}

function TradingViewWidgetQuotes({ title, scriptUrl }: TradingViewWidgetQuotesProps) {
  const container = useRef<HTMLDivElement>(null);

     useEffect(() => {
     const script = document.createElement("script");
     script.src = scriptUrl ?? "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
     script.type = "text/javascript";
     script.async = true;
     script.innerHTML = `
       {
         "displayMode": "regular",
         "feedMode": "all_symbols",
         "colorTheme": "dark",
         "isTransparent": false,
         "locale": "en",
         "width": "100%",
         "height": 550
       }`;
     container.current?.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [scriptUrl]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      {title && <h2 className="widget-title">{title}</h2>}
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Market Quotes</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
}

export default memo(TradingViewWidgetQuotes);
