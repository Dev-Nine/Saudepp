import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', 'uploads'),
        filename: (req, file, callback) => {
            const hash = crypto.randomBytes(6).toString('hex');
            const fileType = file.mimetype.split('/')[1];
            const fileName = `${hash}.${fileType}`;
            callback(null, fileName);
        }
    }),
    limits:{
        fileSize: 5242880
    }
        
}
