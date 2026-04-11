import sharp from "sharp";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "No url" });
    }

    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());

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

    r = Math.round(r / pixels);
    g = Math.round(g / pixels);
    b = Math.round(b / pixels);

    res.status(200).json({ r, g, b });
  } catch (e) {
    console.error(e);
    res.status(500).json({ r: 32, g: 32, b: 32 });
  }
}
