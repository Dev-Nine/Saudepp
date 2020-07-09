import multer = require('multer')
import path = require('path')
import crypto = require('crypto')

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', 'uploads'),
        filename: (req, file, callback) => {
            const hash = crypto.randomBytes(6).toString('hex');
            const fileName = `${hash}`;
            callback(null, fileName);
        }
    }),
    limits:{
        fileSize: 1048576
    }
        
}