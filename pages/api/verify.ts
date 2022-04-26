

import { v4 as uuidv4 } from "uuid";
import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession, contractAddress, addressCheckMiddleware, pinataApiKey, pinataSecretApiKey } from "./utils";
import { NftMeta } from "@_types/nft";
import axios from "axios";

export default withSession(async (req: NextApiRequest & {session: Session}, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {body} = req;
      const nft = body.nft as NftMeta
      
      if (!nft.name || !nft.description || !nft.attributes) {
        return res.status(422).send({message: "Some of the form data are missing!"}); 
      }

      await addressCheckMiddleware(req, res);

      const jsonRes = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        pinataMetadata: {
          name: uuidv4()
        },
        pinataContent: nft
      }, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey
        }
      });

      return res.status(200).send(jsonRes.data);
    } catch {
      return res.status(422).send({message: "Cannot create JSON"});
    } 
  } else if (req.method === "GET") {
    try {
      const message = { contractAddress, id: uuidv4() };
      req.session.set("message-session", message);
      await req.session.save();

      return res.json(message);
    } catch {
      return res.status(422).send({message: "Cannot generate a message!"});
    }   
  } else {
    return res.status(200).json({message: "Invalid api route"});
  }
})