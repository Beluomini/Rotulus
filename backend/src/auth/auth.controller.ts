import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: AuthRequest) {

        const userAccessToken = await this.authService.login(req.user);

        const response = {
            user: req.user,
            ...userAccessToken,
        };

        return response;
    }

}
