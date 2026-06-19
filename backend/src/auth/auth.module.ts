import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: "8f5b3a2e7c1d9f4b6a8e3d2c5b1a7f9e8d4c2b6a3f1e9d7c5b8a2f4e6d9c1b3a2f5e7d8c9b1a3f4e6d7c8b9a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0alice",
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}
