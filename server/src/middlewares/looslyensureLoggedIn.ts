import { VerifyAccountToken } from "@/utils/cookieCreator";
import { NextFunction, Request, Response } from "express";
import httpError from "http-errors";    
export const looselyLoggedIn = (req:any, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return next();
    }

    // verify token
    try {
        const decoded = VerifyAccountToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return next(httpError(401, "INVALID TOKEN"));
    }
}