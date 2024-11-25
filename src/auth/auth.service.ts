import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

    async signIn(username: string, password: string): Promise<AuthResponseDto> {
        const userFound = await this.userService.getUserByUsername(username);

        if (!userFound || !compareSync(password, userFound.passwordHash)) {

            throw new UnauthorizedException();
        }

        const payload = { sub: userFound.id, username: userFound.username };

        const token = this.jwtService.sign(payload);
        return { token, expiresIn: this.jwtExpirationTimeInSeconds };

    }
}
