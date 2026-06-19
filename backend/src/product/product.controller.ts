import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UploadService } from 'src/upload/upload.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService, private readonly uploadService: UploadService){}

    @Post()
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string) {
        return await this.productService.findOne(id);
    }

    // UPDATE PRODUCT
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return await this.productService.update(id, updateProductDto);
    }

    // DELETE PRODUCT
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string) {
        return await this.productService.remove(id);
    }
}
