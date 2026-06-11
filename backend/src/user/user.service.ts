import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async create(){}

    async findMany(){}

    async findUnique(){}

    async Update(){}

    async delete(id: string){
        const user = await this.prisma.user.findUnique({where: {id}})
        
        if (!user){
            throw new NotFoundException("Cette utilisateur n'existe pas!")
        }
        await this.prisma.user.delete({where: {id}})
    }
}
