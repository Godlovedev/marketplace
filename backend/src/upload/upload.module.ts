import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CloudinaryProvider } from 'src/config/cloundinary';

@Module({
  providers: [UploadService, CloudinaryProvider],
  exports: [UploadService, CloudinaryProvider]
})
export class UploadModule {}
