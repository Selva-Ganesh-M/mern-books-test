import { Request, Response, NextFunction } from "express"
import CustomError from "./customError";

export default async (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = (err instanceof CustomError) ? err.statusCode : 500;
    return res.status(statusCode).json({
        ...err, statusText: CustomError.statusText
    });
}