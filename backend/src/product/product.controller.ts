import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UploadService } from 'src/upload/upload.service';
import { UpdateProductDto } from './dto/update-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService, private readonly uploadService: UploadService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() createProductDto: CreateProductDto, @UploadedFile() file: any) {
    const imageUrl = await this.uploadService.uploadImage(file) as string;

    return await this.productService.create(createProductDto, imageUrl);
    }

    @Get()
    async findAll() {
        return await this.productService.findAll();
    }

    // GET ONE PRODUCT
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.productService.findOne(id);
    }

    // UPDATE PRODUCT
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return await this.productService.update(id, updateProductDto);
    }

    // DELETE PRODUCT
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.productService.remove(id);
    }
}
