import jimp from "jimp";
import axios from "axios";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "No url" });

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);
    const image = await jimp.read(buffer);
    
    image.resize(1, 1);
    
    const hex = image.getPixelColor(0, 0);
    const { r, g, b } = jimp.intToRGBA(hex);

    res.status(200).json({ r, g, b });
  } catch (e) {
    console.error("API ERROR:", e.message);
    res.status(500).json({ error: "Failed to process image" });
  }
}
