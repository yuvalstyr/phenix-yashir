const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../lib/sheetCred.json");
const SPREADSHEET_ID = "1kBdcPSF7nVvk1Ydya233ww11zUrZAtfoXGQHaiklyV0";

export default async function handler(req, res) {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({ ...req.body, status: "new" });
  res.status(200).json({ good: "vibes" });
}
