"use client"

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetHotMapProps {
  title?: string;
  scriptUrl?: string;
}


function TradingViewWidgetHotMap({ title, scriptUrl }: TradingViewWidgetHotMapProps) {
   const container = useRef(null);

   useEffect(
     () => {
       const script = document.createElement("script");
      script.src = scriptUrl ?? "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
       script.type = "text/javascript";
       script.async = true;
       script.innerHTML = `
         {
           "dataSource": "SPX500",
           "blockSize": "market_cap_basic",
           "blockColor": "change",
           "grouping": "sector",
           "locale": "en",
           "symbolUrl": "",
           "colorTheme": "dark",
           "exchanges": [],
           "hasTopBar": false,
           "isDataSetEnabled": false,
           "isZoomEnabled": true,
           "hasSymbolTooltip": true,
           "isMonoSize": false,
           "width": "100%",
           "height": "100%"
         }`;
       container.current?.appendChild(script);
       
       return () => {
        if (container.current) {
          container.current.innerHTML = '';
        }
      };
     },
    [scriptUrl]
   );

   return (
     <div className="tradingview-widget-container" ref={container}>
      {title && <h2 className="widget-title">{title}</h2>}
       <div className="tradingview-widget-container__widget"></div>
       <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/heatmap/stock/" rel="noopener nofollow" target="_blank"><span className="blue-text">Stock Heatmap</span></a><span className="trademark"> by TradingView</span></div>
     </div>
   );
 }
 
export default memo(TradingViewWidgetHotMap);
