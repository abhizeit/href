import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/db";
import urlModel from "../../models/url.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  const { sid } = req.query;
  const { method } = req;
  if (method === "GET") {
    try {
      const data = await urlModel.findOne({ shortUrl: sid });
      data.clickCount++;
      data.save();
      res.json({ url: data.mainUrl, error: false });
    } catch (e) {
      res.json({ error: true });
    }
  }
}
