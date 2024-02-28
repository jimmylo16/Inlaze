import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { LoginUserDto, CreateUserDto } from './dto';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mails/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private configService: ConfigService,

    private readonly mailService: MailService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    const userExists = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (userExists) throw new BadRequestException('User already exists');

    try {
      const user = this.userRepository.create({
        ...userData,
        password: await this.hashData(password),
      });

      this.mailService.sendMail({
        recipientEmail: user.email,
        subject: 'Welcome to our platform',
        textPart: 'Welcome to our platform',
        htmlPart: '<h1>Welcome to our platform</h1>',
      });

      await this.userRepository.save(user);
      delete user.password;

      const tokens = await this.getJwtToken({ id: user.id });
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        ...user,
        token: tokens.accessToken,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }, //! OJO!
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    const tokens = await this.getJwtToken({ id: user.id });

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      ...user,
      token: tokens.accessToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = bcrypt.compare(user.refreshToken, refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getJwtToken({ id: user.id });

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.userRepository.update(userId, { refreshToken: null });
  }

  private async getJwtToken(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          payload,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          payload,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Please check server logs');
  }
}
