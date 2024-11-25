import { IsOptional, IsString, IsUUID } from "class-validator";

export class UserDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}