import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UploadService } from "../upload/upload.service";
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    private readonly uploadService;
    constructor(productService: ProductService, uploadService: UploadService);
    create(createProductDto: CreateProductDto, file: any): Promise<{
        message: string;
    }>;
    findAll(): Promise<({
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        imageUrl: string;
        isActive: boolean;
        categoryId: string;
    })[]>;
    findOne(id: string): Promise<({
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        imageUrl: string;
        isActive: boolean;
        categoryId: string;
    }) | null>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
