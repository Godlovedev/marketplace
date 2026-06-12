import { PrismaService } from "../prisma.service";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, data: UpdatUserDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
