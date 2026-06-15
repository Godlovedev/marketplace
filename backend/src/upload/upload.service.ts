import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  
  async uploadImage(file: any) {
    return new Promise((resolve, reject) => {
      // Grâce au provider, le module de cloudinary est déjà configuré ici !
      cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {
          if (error) return reject(error);
          // On retourne l'URL sécurisée de l'image
          resolve(result?.secure_url);
        },
      ).end(file.buffer); // On lui envoie les octets (buffer) de l'image
    });
  }
}