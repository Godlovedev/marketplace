import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({data: createUserDto});
  }

  // GET ALL USERS
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // GET ONE USER BY ID
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // GET USER BY EMAIL (important pour auth)
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // UPDATE USER
  async update(
    id: string, data: UpdatUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // DELETE USER
  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}