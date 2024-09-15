import JWT from "jsonwebtoken";
import { env } from "./env";
import { Request, Response } from "express";

export const CreateAccountToken = (id: string) => {
  return JWT.sign({ id }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
};

export const VerifyAccountToken = (token: string) => {
  return JWT.verify(token, env.jwt.secret);
};

export const CreateAuthCookie = (id: string, res: Response) => {
  const token = CreateAccountToken(id);
  // console.log("cookie expiry",token)
  res.cookie("token", token, {
    httpOnly: true,
    // expires:String(env.jwt.cookieExpiry) as any ,
    secure: process.env.NODE_ENV === "production",
  });
};
