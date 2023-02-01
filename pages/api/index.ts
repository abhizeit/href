// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/db";
import shortId from "shortid";
import urlModel from "../../models/url.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  if (req.method === "POST") {
    const { mainUrl } = req.body;
    const shortUrl = shortId.generate();
    try {
      const data = await urlModel.create({ mainUrl, shortUrl });
      res.json(data);
    } catch (error) {
      res.json({ error: true });
    }
  } else if (req.method === "GET") {
    try {
      const data = await urlModel.find({});
      res.json({ error: false, data });
    } catch (error: any) {
      res.json({ error: true });
    }
  }
}
