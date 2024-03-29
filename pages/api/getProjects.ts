import type { NextApiRequest, NextApiResponse } from "next";
const snt = require('next-sanity');
import { sanityClient } from "../../sanity";
import { Project } from "@/typings";

const query = snt.groq`
    *[_type == "project"] {
        ...,
        technologies[]->
    }
`

type Data = {
    projects: Project[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const projects: Project[] = await sanityClient.fetch(query);
    res.status(200).json({ projects })
  }
  