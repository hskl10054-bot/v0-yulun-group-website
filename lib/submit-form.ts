// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzAj4xIhPOLFOzEBFzOHkmpNk6VejfsD8Cq_4ckhja-ubWufXyxrZ2Wfp-2ALre5T5y/exec"

// Redirect URL after successful submission — replace with your pricing website URL
const REDIRECT_URL = "https://proquote-website.vercel.app/"

interface FormData {
  [key: string]: string
}

export async function submitForm(data: FormData, source: string): Promise<"success"> {
  const payload = { ...data, source, timestamp: new Date().toISOString() }

  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  })

  if (REDIRECT_URL) {
    window.location.href = REDIRECT_URL
  }

  return "success"
}
