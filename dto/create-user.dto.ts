import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Max, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @Max(20, { message: 'Name must be less than 20 characters long' })
    name: string;
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
    @IsOptional()
    @IsEnum(['admin', 'user'], { message: 'Role must be either admin or user' })
    role?: 'admin' | 'user';
}