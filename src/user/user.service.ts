import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    private async findUser(username: string): Promise<UserEntity> {
        const userFound = await this.userRepository.findOne({ where: { username } });

        if (!userFound) {
            throw new HttpException(`oops.. user '${username}' not found`, HttpStatus.NOT_FOUND);
        }

        return userFound;
    }

    async create(user: UserDto): Promise<UserEntity> {
        const userExist = await this.userRepository.findOne({ where: { username: user.username } });

        if (userExist) {
            throw new HttpException('Username already in use', HttpStatus.CONFLICT);
        }

        const newUser = new UserEntity();

        newUser.name = user.name;
        newUser.lastname = user.lastname;
        newUser.username = user.username;
        newUser.passwordHash = hashSync(user.password, 10);

        return await this.userRepository.save(newUser);
    }

    async getUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getUserByUsername(username: string): Promise<UserEntity> {
        return this.findUser(username);
    }

    async update(username: string, user: UserDto): Promise<void> {
        const userFound = await this.findUser(username);

        userFound.name = user.name;
        userFound.lastname = user.lastname;
        userFound.username = user.username;

        await this.userRepository.update(userFound.id, userFound);
    }

    async delete(username: string): Promise<void> {
        const userFound = await this.findUser(username);

        await this.userRepository.remove(userFound)
    }
}
