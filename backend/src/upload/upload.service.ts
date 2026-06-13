import { Injectable } from '@nestjs/common';
import cloudinary from 'src/config/cloundinary';

@Injectable()
export class UploadService {

    async uploadImage(file: any) {
        return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
            if (error) return reject(error);
            resolve(result?.secure_url);
            },
        ).end(file.buffer);
        });
    }
}
