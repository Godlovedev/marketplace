import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService){}

    async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('Cette email existe deja en base de données');
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return {message: "Utilisateur créé avec success"}
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("Cette utilisateur n'esxiste pas");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new ConflictException('Mot de passe incorrect');
    }

    const payload = {
      sub: user.id,
    };


    return { access_token: await this.jwtService.signAsync(payload)};
  }


}
