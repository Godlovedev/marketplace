import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

    constructor(private readonly prisma: PrismaService){}

    async create(createCategoryDto: CreateCategoryDto) {
    await this.prisma.category.create({
      data: createCategoryDto,
    });
    return {message:"Categorie créée."}
  }

  async findAll() {
    return await this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    return {message: "Opération réussie!"}
  }

  async remove(id: string) {
    await this.prisma.category.delete({
      where: { id },
    });
    return {message: "Opération réussie!"}
    }

}
