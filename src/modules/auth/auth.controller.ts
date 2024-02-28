import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  logoutUser(@Req() req: Request) {
    return this.authService.logout(((req as any).user as User)['id']);
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt'))
  refreshTokens(@Req() req: Request) {
    const user = (req as any).user as User;
    const userId = user['id'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
