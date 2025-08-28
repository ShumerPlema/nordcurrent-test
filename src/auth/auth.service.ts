import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from 'src/user/user.service';
import { ErrorMessages } from 'src/common/error-messages';
import { HashService } from 'src/common/services/hash.service';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import config from 'src/common/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashPassword: HashService,
    private readonly jwtService: JwtService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(registrationDto: RegistrationDto) {
    const { email, password } = registrationDto;

    const userInfo = await this.userService.getUserByEmail(email);

    if (userInfo) {
      throw new BadRequestException(
        ErrorMessages.BadRequestException.USER_WITH_EMAIL_ALREADY_EXISTS,
      );
    }

    const hashedPassword = await this.hashPassword.hash(password);

    const createdUser = await this.userService.createUser({
      email,
      password: hashedPassword,
    });

    return this.userService.getUserById(createdUser.id);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const userInfo = await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'password'],
    });

    if (!userInfo) {
      throw new NotFoundException(
        ErrorMessages.NotFoundException.USER_NOT_FOUND,
      );
    }

    const isPasswordCorrect = await this.hashPassword.comparePasswords(
      password,
      userInfo.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException(
        ErrorMessages.BadRequestException.INVALID_CREDENTIALS,
      );
    }

    const accessToken = this.generateAccessToken(userInfo);

    return { accessToken };
  }

  generateAccessToken(userInfo: UserEntity) {
    const accessToken = this.jwtService.sign(
      { id: userInfo.id },
      {
        expiresIn: config.JWT.ACCESS_TOKEN_TTL,
        secret: config.JWT.ACCESS_SECRET,
      },
    );

    return accessToken;
  }
}
