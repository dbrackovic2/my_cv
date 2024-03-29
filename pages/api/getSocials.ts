import type { NextApiRequest, NextApiResponse } from "next";
const snt = require('next-sanity');
import { sanityClient } from "../../sanity";
import { Social } from "@/typings";

const query = snt.groq`
    *[_type == "social"]
`

type Data = {
    socials: Social[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const socials: Social[] = await sanityClient.fetch(query);
    res.status(200).json({ socials })
  }
  