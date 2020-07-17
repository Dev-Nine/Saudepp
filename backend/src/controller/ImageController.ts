import { Request, Response } from 'express';
import cloudinary from 'cloudinary'
import fs from 'fs';
import cloudinaryConfig from '../config/cloudinaryConfig';

export async function create(req : Request, res : Response, next) : Promise<Response>{
	const {path} = req.file;
	try{
		fs.readFile(path, (err, data) => {
			const base64image = Buffer.from(data).toString('base64')
			var form = {
				type: `image/${path.split('.')[path.split('.').length - 1]}`,
				image: base64image
			}

			cloudinary.v2.config(cloudinaryConfig);

			cloudinary.v2.uploader.upload(
				`data:${form.type};base64,${form.image}`,
				(err, result) => {
					if(err)
						throw new Error;
					const data = {
						imageId: result.public_id,
						imageType: result.format
					}
					return res.status(200).json(data);
				})
		});
	}catch(err){
		return next(err);
	} finally {
		fs.unlink(path, () => {});
	}
}
