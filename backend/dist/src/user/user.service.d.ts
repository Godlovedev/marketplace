import { PrismaService } from "../prisma.service";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, data: UpdatUserDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
