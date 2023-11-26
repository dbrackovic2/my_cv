import type { NextApiRequest, NextApiResponse } from "next";
const snt = require('next-sanity');
import { sanityClient } from "../../sanity";
import { Experience } from "@/typings";

const query = snt.groq`
    *[_type == "experience"] {
        ...,
        technologies[]->
    }
`

type Data = {
    experiences: Experience[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const experiences: Experience[] = await sanityClient.fetch(query);
    res.status(200).json({ experiences })
  }
  