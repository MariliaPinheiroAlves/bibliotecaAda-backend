import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class BookDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    title: string;

    @IsString()
    @MinLength(1)
    @MaxLength(256)
    author: string;

    @IsString()
    @MinLength(1)
    @MaxLength(1280)
    description: string;

    @IsString()
    @IsOptional()
    photoUrl: string;

    @IsBoolean()
    @IsOptional()
    available: boolean
}