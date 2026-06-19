import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export type Payload = {sub: string}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "8f5b3a2e7c1d9f4b6a8e3d2c5b1a7f9e8d4c2b6a3f1e9d7c5b8a2f4e6d9c1b3a2f5e7d8c9b1a3f4e6d7c8b9a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0alice",
    });
  }

  async validate(payload: Payload) {
    const {sub} = payload
    const user = await this.prisma.user.findUnique({where: {id:sub}})
    return user
  }
}
