import sharp from "sharp";
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "No url" });
    }

    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data);

    const { data, info } = await sharp(buffer)
      .resize(16, 16)
      .raw()
      .toBuffer({ resolveWithObject: true });

    let r = 0, g = 0, b = 0;
    const pixels = info.width * info.height;

    for (let i = 0; i < data.length; i += info.channels) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    res.status(200).json({
      r: Math.round(r / pixels),
      g: Math.round(g / pixels),
      b: Math.round(b / pixels),
    });

  } catch (e) {
    console.error("COLOR API ERROR:", e);

    res.status(500).json({ error: "color failed" });
  }
}
