import { Request, Response } from 'express';
import fs = require('fs')
import imgurApi, {config} from '../utils/imgurApi';
import { NotFound } from '../Errors';

export default class ImageController {

    public async create(req : Request, res : Response, next) : Promise<Response>{
        const {path} = req.file;
        try{
            fs.readFile(path, (err, data) => {
                const base64image = Buffer.from(data).toString('base64')
                var form = {
                    type: 'base64',
                    image: base64image
                }
    
                imgurApi.post("upload/", form, config)
                .then(response => {
                    const result = response.data
                    const data = {
                        id: result.data.id,
                        type: result.data.type.split('/')[1],
                        deletehash: result.data.deletehash
                    }
                    return res.status(result.status).json(data)
                }).catch(err => {
                    return next(err);
                })
            });
        }catch(err){
            return next(err);
        } finally {
            fs.unlink(path, () => {});
        }
    }
}
