import { NextFunction, Request, Response } from "express"
import {HttpError} from "http-errors"
export const errMiddle = (err:HttpError , req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
        status:err.status,
        error: err.name,
        message: err.message
        
    })
    // next()
}