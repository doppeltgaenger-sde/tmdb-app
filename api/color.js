import Jimp from "jimp";
import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data);
    const image = await Jimp.read(imageBuffer);
    
    image.resize(1, 1);

    const pixelColor = image.getPixelColor(0, 0);
    const { r, g, b } = Jimp.intToRGBA(pixelColor);

    return res.status(200).json({ r, g, b });

  } catch (error) {
    console.error("[Color API Error]:", error.message);
    
    return res.status(500).json({ 
      error: "Failed to process image color",
      message: error.message 
    });
  }
}
