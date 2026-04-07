// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzAj4xIhPOLFOzEBFzOHkmpNk6VejfsD8Cq_4ckhja-ubWufXyxrZ2Wfp-2ALre5T5y/exec"

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

  return "success"
}
