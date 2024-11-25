import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post()
    async signIn(
        @Body('username') username: string,
        @Body('password') password: string,
    ): Promise<AuthResponseDto> {
        return this.authService.signIn(username, password)
    }
}
