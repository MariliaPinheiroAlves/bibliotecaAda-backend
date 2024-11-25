import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UseGuards(AuthGuard)
    @Get()
    async getUser(): Promise<UserEntity[]> {
        return await this.userService.getUsers();
    }

    @UseGuards(AuthGuard)
    @Get('/:username')
    async getUserById(@Param('username') username: string): Promise<UserEntity> {
        return await this.userService.getUserByUsername(username);
    }

    @Post()
    async create(@Body() user: UserDto): Promise<void> {
        this.userService.create(user);
    }

    @UseGuards(AuthGuard)
    @Put('/:username')
    async update(@Param('username') username: string, @Body() user: UserDto): Promise<void> {
        await this.userService.update(username, user);
    }

    @UseGuards(AuthGuard)
    @Delete('/:username')
    async delete(@Param('username') username: string): Promise<void> {
        await this.userService.delete(username);
    }
}
