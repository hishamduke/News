import prisma from "../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const date = new Date();

  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  try {
    var decoded = verify(JWT, secret);
    const userac = await prisma.accounts.findUnique({
      where: {
        email: decoded.email,
      },
    });
    console.log(userac);
    res.status(200).json(userac.role);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.name });
  }

  console.log(date.getTime());
}
