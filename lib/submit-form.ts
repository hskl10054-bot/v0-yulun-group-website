// Google Apps Script Web App URL — replace with your deployed URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzAj4xIhPOLFOzEBFzOHkmpNk6VejfsD8Cq_4ckhja-ubWufXyxrZ2Wfp-2ALre5T5y/exec"

// Redirect URL after successful submission — replace with your pricing website URL
const REDIRECT_URL = "YOUR_PRICING_WEBSITE_URL"

interface FormData {
  [key: string]: string
}

export async function submitForm(data: FormData, source: string): Promise<void> {
  const payload = { ...data, source, timestamp: new Date().toISOString() }

  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  // no-cors returns opaque response, so we redirect regardless
  window.location.href = REDIRECT_URL
}
