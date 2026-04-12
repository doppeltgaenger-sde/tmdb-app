import Jimp from "jimp";
import axios from "axios";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "No url provided" });

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const image = await Jimp.read(buffer);
    image.resize(1, 1);

    const hex = image.getPixelColor(0, 0);
    const { r, g, b } = Jimp.intToRGBA(hex);

    res.status(200).json({ r, g, b });

  } catch (e) {
    console.error("API ERROR:", e.message);
    res.status(500).json({ error: e.message });
  }
}
