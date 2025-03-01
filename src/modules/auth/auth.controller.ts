import { Controller, UseGuards, Post, Request, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';
import { ValidateInputPipe } from 'src/core/pipes/validate.pipe';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('signup')
    @UsePipes(new ValidateInputPipe())
    @UseGuards(DoesUserExist)
    async signUp(@Body() user: UserDto) {
        console.log('Received Data:', user);
        return await this.authService.create(user);
    }
}
