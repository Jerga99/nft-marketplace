

import { v4 as uuidv4 } from "uuid";
import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession, contractAddress } from "./utils";
import { NftMeta } from "@_types/nft";

export default withSession(async (req: NextApiRequest & {session: Session}, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {body} = req;
      const nft = body.nft as NftMeta
      
      if (!nft.name || !nft.description || !nft.attributes) {
        res.status(422).send({message: "Some of the form data are missing!"});
      }

      res.status(200).send({message: "Nft has been created"});
    } catch {
      res.status(422).send({message: "Cannot create JSON"});
    } 
  } else if (req.method === "GET") {
    try {
      const message = { contractAddress, id: uuidv4() };
      req.session.set("message-session", message);
      await req.session.save();

      res.json(message);
    } catch {
      res.status(422).send({message: "Cannot generate a message!"});
    }   
  } else {
    res.status(200).json({message: "Invalid api route"});
  }
})