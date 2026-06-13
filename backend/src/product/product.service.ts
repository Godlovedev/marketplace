import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

    constructor(private readonly prisma: PrismaService){}

    async create(createProductDto: CreateProductDto, imageUrl: string) {
        await this.prisma.product.create({
            data: {
            ...createProductDto,
            imageUrl,
            },
        });
        return {message:"Creation réussie!"}
        }

    async findAll() {
        return await this.prisma.product.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        });
    }

    async findOne(id: string) {
        return await this.prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
        },
        });
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
        });
        return {message: "Opération réussie!"}
    }

    async remove(id: string) {
        await this.prisma.product.delete({
        where: { id },
        });
        return {message: "Opération réussie!"}
    }
}
