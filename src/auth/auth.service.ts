import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.usersService.findOne(loginDTO);

    const passwordsMatch = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    delete user.password;

    const payload = { email: user.email, sub: user.id };
    return {
      // accessToken: this.jwtService.sign(payload),
    };
  }
}
