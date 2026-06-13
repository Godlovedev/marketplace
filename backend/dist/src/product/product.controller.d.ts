import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UploadService } from "../upload/upload.service";
export declare class ProductController {
    private readonly productService;
    private readonly uploadService;
    constructor(productService: ProductService, uploadService: UploadService);
    create(createProductDto: CreateProductDto, file: any): Promise<{
        message: string;
    }>;
}
