import { AuthService } from './auth.service';
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginDto } from "../user/dto/login-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
