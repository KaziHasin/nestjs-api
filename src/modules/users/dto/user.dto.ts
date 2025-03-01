import { IsNotEmpty, MinLength, IsEmail, IsEnum, Validate } from 'class-validator';

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UserDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male or female',
    })
    readonly gender: Gender;
}