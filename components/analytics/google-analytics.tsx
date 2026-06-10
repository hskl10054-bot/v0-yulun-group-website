import Script from "next/script"

// Google Analytics 4 (GA4) — site-wide gtag.js install. GA4 Enhanced
// Measurement (on by default) tracks SPA page views on history changes.
const GA_ID = "G-DY3G1F3KEH"

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  )
}
