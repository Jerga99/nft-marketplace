import { NextApiRequest, NextApiResponse } from "next";
import { withIronSession, Session } from "next-iron-session";
import contract from "../../public/contracts/NftMarket.json";

const NETWORKS = {
  "5777": "Ganache"
}

type NETWORK = typeof NETWORKS;

const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof NETWORK;

export const contractAddress = contract["networks"][targetNetwork]["address"];

export function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: "nft-auth-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    }
  })
}

export const addressCheckMiddleware = async (req: NextApiRequest & { session: Session}, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    const message = req.session.get("message-session");
    
    if (message) {
      resolve("Correct Address");
    } else {
      reject("Wrong Address");
    }
  })
}