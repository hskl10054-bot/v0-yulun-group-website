"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Meta Pixel (Facebook) — site-wide base install + SPA PageView tracking.
const PIXEL_ID = "974629675373750"

export function MetaPixel() {
  const pathname = usePathname()

  // The base snippet fires PageView once on first load. Next.js does
  // client-side navigation, so re-fire PageView whenever the path changes.
  useEffect(() => {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void }
    if (typeof w.fbq === "function") w.fbq("track", "PageView")
  }, [pathname])

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
