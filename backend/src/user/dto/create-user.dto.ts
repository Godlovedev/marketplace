import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail({}, {message: "Entrez un email valide!"})
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}