import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError";
import isValidMongoId from "../utils/isValidMongoId";
import { IAuthor } from "../models/authorModel";
import { authorModel } from "../models/Author.model";

const createAuthor = function(req: Request<{}, {}, IAuthor, {}>, res: Response, next: NextFunction){
        const authorPayload = req.body;
        if (!authorPayload) return next(new CustomError(400, "author details should be provided to create author."));
        let author = new authorModel(authorPayload);
        author
        .save()
        .then((author)=>{
            return res.status(201).json({
                statusText: "success",
                message: "new author created",
                payload: {...author.toObject(), password: null}
            })
        }).catch((err)=>{
            return next(err);
        })
}

const getAuthor = (req: Request<{authorId: string}>, res: Response, next: NextFunction) => {
    if (!req.params.authorId) return next(new CustomError(400, "authorId is mandatory"));
    if(!isValidMongoId(req.params.authorId)) return next(new CustomError(400, "invalid author id is provided."))
    authorModel
    .findById(req.params.authorId)
    .lean()
    .then((author)=>{
        if(!author) return next(new CustomError(404, 'author not found.'))
        return res.status(200).json({
            statusText: "success",
            message: "author fetch success.",
            payload: author
    })
    })
    .catch(err=>{
        return next(err);
    })
}

const getAllAuthors = (req: Request, res: Response, next: NextFunction) => {
    authorModel
    .find()
    .lean()
    .then((authors)=>{
        return res.status(200).json({
            statusText: "success",
            message: "fetch all authors success",
            payload: authors
        });
    })
    .catch((err)=>next(err))
}

const updateAuthor = (req: Request<{authorId: string}, {}, Partial<IAuthor>, {}>, res: Response, next: NextFunction) => {
    let authorId = req.params.authorId;
    if(!isValidMongoId(authorId)) return next(new CustomError(400, "invalid authorId is provided."));
    let authorPayload = req.body;
    if (!authorPayload || Object.keys(authorPayload).length==0) 
        return next(new CustomError(400, "author details is mandatory to update the author."));
    authorModel
    .findByIdAndUpdate(authorId, {
        $set: authorPayload
    }, {
        new: true
    })
    .lean()
    .then(author=>{
        if(!author) return next(new CustomError(404, 'author not found'))
        return res.status(200).json({
            statusText: "success",
            message: "author updated successfully.",
            payload: author 
        })
    })
    .catch(err=>next(err));
}

const deleteAuthor = function(req: Request<{authorId: string}>, res: Response, next: NextFunction){
    let authorId = req.params.authorId;
    if(!authorId) return next(new CustomError(400, 'invalid authorId provided'));
    authorModel
    .deleteOne({
        _id: authorId
    })
    .lean()
    .then(data=>{
        if (data.deletedCount!=1) return next(new CustomError(404, "author not found."))
        return res.status(200).json({
            statusText: 'success',
            message: 'author deleted successfully',
            payload: null
            })
    })
    .catch(err=>next(err))
}

export const authorCtrl = {
    createAuthor,
    getAuthor,
    getAllAuthors,
    updateAuthor,
    deleteAuthor
}