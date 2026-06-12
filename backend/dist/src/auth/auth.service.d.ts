import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
