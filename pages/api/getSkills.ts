import type { NextApiRequest, NextApiResponse } from "next";
const snt = require('next-sanity');
import { sanityClient } from "../../sanity";
import { Skill } from "@/typings";

const query = snt.groq`
    *[_type == "skill"]
`

type Data = {
    skills: Skill[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const skills: Skill[] = await sanityClient.fetch(query);
    res.status(200).json({ skills });
  }
  