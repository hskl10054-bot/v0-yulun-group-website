/**
 * Google Apps Script — 部署為 Web App 後接收表單資料並寫入 Google Sheets
 *
 * 使用步驟：
 * 1. 前往 https://script.google.com 建立新專案
 * 2. 將此檔案的內容貼入編輯器
 * 3. 將 SHEET_ID 替換為你的 Google 試算表 ID
 *    （試算表網址中 /d/ 和 /edit 之間的那段文字）
 * 4. 點選「部署」→「新增部署」→ 類型選「網頁應用程式」
 *    - 說明：表單收集
 *    - 執行身分：我
 *    - 誰可以存取：任何人
 * 5. 點選「部署」，複製產生的 Web App URL
 * 6. 將該 URL 貼到 lib/submit-form.ts 中的 GOOGLE_SCRIPT_URL
 */

const SHEET_ID = "YOUR_GOOGLE_SHEET_ID";

function doPost(e) {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // First row as headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "時間戳記",
      "來源頁面",
      "姓名",
      "聯絡電話",
      "服務/案件/工程類型",
      "預算金額",
      "坪數",
      "需求說明",
    ]);
  }

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.source || "",
    data["姓名"] || "",
    data["聯絡電話"] || "",
    data["有興趣的服務"] || data["案件類型"] || data["工程類型"] || "",
    data["預算金額"] || "",
    data["坪數（選填）"] || "",
    data["需求說明"] || data["工程說明"] || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}
