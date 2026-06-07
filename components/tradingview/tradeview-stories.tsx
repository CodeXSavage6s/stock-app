"use client"

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetTopStoriesProps {
  title?: string;
  scriptUrl?: string;
}

function TradingViewWidgetTopStories({ title, scriptUrl }: TradingViewWidgetTopStoriesProps) {
   const container = useRef(null);

   useEffect(
     () => {
       const script = document.createElement("script");
      script.src = scriptUrl ?? "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
       script.type = "text/javascript";
       script.async = true;
       script.innerHTML = `
         {
           "displayMode": "regular",
           "feedMode": "all_symbols",
           "colorTheme": "dark",
           "isTransparent": false,
           "locale": "en",
           "width": 400,
           "height": 550
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
       <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/news/top-providers/tradingview/" rel="noopener nofollow" target="_blank"><span className="blue-text">Top stories</span></a><span className="trademark"> by TradingView</span></div>
     </div>
   );
 }

export default memo(TradingViewWidgetTopStories);
