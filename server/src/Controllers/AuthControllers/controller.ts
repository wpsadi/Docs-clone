import { NextFunction, Request, Response } from "express";
import httpError from "http-errors";
import { GithubOauthApp, scopes } from "./Auths/Github/initGithub";
import { env } from "@/utils/env";
import { Octokit } from "@octokit/rest";
import { CreateAuthCookie } from "@/utils/cookieCreator";
import { Prisma } from "@/prisma/prisma";
export const GithubLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url } = GithubOauthApp.getWebFlowAuthorizationUrl({
      redirectUrl: `${env.baseURL}/auth/github/callback`,
      scopes: scopes.userInfo[0],
    });

    // // console.log(url, `${env.baseURL}/auth/github/callback`)
    res.redirect(url);
  } catch (err: any) {
    next(httpError(500, "Could not login with github"));
  }
};

export const GithubCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.query;
    const { authentication } = await GithubOauthApp.createToken({
      code: code as string,
    });
    const token = authentication.token;
    const octokit = new Octokit({
      auth: token,
    });

    //   const { data: githubUserInfo } = await octokit.request('GET /user');
    const { data: emails } = await octokit.request("GET /user/emails");
    const primaryEmail = emails.find((email) => email.primary);

    if (!primaryEmail) {
      return res.redirect(`${env.ClientBaseURL}/signup-failed`);
      // return next(httpError(400, "Could not get primary email"));
    }

    // check if user exists in db
    const userExists = await Prisma.user.findFirst({
      where: {
        email: (primaryEmail?.email).toLowerCase(),
      },
    });

    const id = userExists!.id;

    if (userExists) {
      CreateAuthCookie(id, res);
      // res.send("welcome back")
      res.redirect(`${env.ClientBaseURL}/dashboard`);
      return;
    }

    // create user
    const newUser = await Prisma.user.create({
      data: {
        email: primaryEmail?.email,
      },
    });

    const newId = newUser!.id;

    CreateAuthCookie(newId, res);
    // res.json({
    //   message: "User created successfully",
    //   data: newUser
    // })
    res.redirect(`${env.ClientBaseURL}/dashboard`);
  } catch (err: any) {
    // console.log(err.message)
    next(httpError(400, "Could not login with github"));
  }
};

export const UserInfo = (req: any, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return next(httpError(401, "Unauthorized. Not logged"));
  }
  res.json({
    message: "User Info",
    id: user.id,
  });
};

export const Logout = (req: any, res: Response, next: NextFunction) => {
  res.clearCookie("token");
  res.redirect(`${env.ClientBaseURL}/dashboard`);
};
